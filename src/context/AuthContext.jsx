// src/context/AuthContext.jsx
// Novara Nature Estates — Auth Context
//
// Authenticates against the real backend (MongoDB "blog_users" collection)
// instead of a client-side/GitHub-committed user list. The backend still has
// its own built-in fallback admin (admin@gmail.com), so that login continues
// to work even if the database is briefly empty.

import { createContext, useContext, useState, useEffect } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://novara-backend-one.vercel.app";

const TOKEN_KEY = "novaraAuthToken";

// ── SSR-safe localStorage helpers ────────────────────────────────────────────
const getStoredSession = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const setStoredSession = (session) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
};
const clearStoredSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const session = getStoredSession();
    if (!session?.user || !session?.token) return;

    // Optimistically sign in from the cached session first (so there's no
    // login flash), then confirm with the server. Only sign the person out
    // if the server explicitly rejects the token (expired/invalid) — a
    // network hiccup or the API being briefly unreachable should not log
    // someone out.
    setUser(session.user);
    setToken(session.token);

    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then((res) => (res.status === 401 ? Promise.reject(new Error("invalid")) : res.json()))
      .then((data) => {
        if (data?.success && data.user) {
          setUser(data.user);
          setStoredSession({ user: data.user, token: session.token });
        }
      })
      .catch((e) => {
        if (e.message === "invalid") {
          clearStoredSession();
          setUser(null);
          setToken(null);
        }
        // any other error (offline, backend cold-starting, etc.) — keep the
        // cached session as-is rather than logging the person out.
      });
  }, []);

  // ── login ─────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Invalid email or password." };
      }

      setStoredSession({ user: data.user, token: data.token });
      setUser(data.user);
      setToken(data.token);

      return { success: true, user: data.user };
    } catch (e) {
      return { success: false, message: "Could not reach the server. Please try again." };
    }
  };

  // ── logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    clearStoredSession();
    setToken(null);
    setUser(null);
  };

  const role = user?.role;

  const value = {
    user,
    token,
    loading: false,
    login,
    logout,
    isAuthenticated:    !!token && !!user,
    isAdmin:            role === "admin",
    isEditor:           role === "editor" || role === "admin",
    isViewer:           role === "viewer",
    canEdit:            role === "editor" || role === "admin",
    canPublish:         role === "editor" || role === "admin",
    canManageUsers:     role === "admin",
    canManageRedirects: role === "admin",
    canView:            !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── hook ──────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}