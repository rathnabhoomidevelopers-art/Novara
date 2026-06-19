// src/context/AuthContext.jsx
// Novara Nature Estates — Auth Context

import { createContext, useContext, useState, useEffect } from "react";
import { USERS as DB_USERS } from "../data/users";

const TOKEN_KEY = "novaraAuthToken";

// ── Hardcoded fallback admin ──────────────────────────────────────────────────
const HARDCODED_USERS = [
  {
    id: "admin",
    email: "admin@gmail.com",
    password: "admin@123",
    role: "admin",
    name: "Novara Admin",
  },
];

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
    if (session?.user && session?.token) {
      setUser(session.user);
      setToken(session.token);
    }
  }, []);

  // ── login ─────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    // Merge hardcoded users + users created via the Users panel (users.js)
    const allUsers = [...HARDCODED_USERS, ...(Array.isArray(DB_USERS) ? DB_USERS : [])];
    const match = allUsers.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (!match) {
      return { success: false, message: "Invalid email or password." };
    }

    const sessionUser  = { email: match.email, role: match.role, name: match.name };
    const sessionToken = btoa(`${match.email}:${match.role}:${Date.now()}`);

    setStoredSession({ user: sessionUser, token: sessionToken });
    setUser(sessionUser);
    setToken(sessionToken);

    return { success: true, user: sessionUser };
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
    // Role flags
    isAdmin:            role === "admin",
    isEditor:           role === "editor" || role === "admin",
    isViewer:           role === "viewer",
    canEdit:            role === "editor" || role === "admin",
    canPublish:         role === "editor" || role === "admin",
    canManageUsers:     role === "admin",
    canManageRedirects: role === "editor" || role === "admin",
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