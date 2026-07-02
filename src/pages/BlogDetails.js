// pages/blogs/@id/+Page.jsx
import {
  ChevronLeft,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
  DownloadIcon,
  Instagram,
} from "lucide-react";
import { navigate } from "vike/client/router";
import { BLOGS } from "../data/blogs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createElement, useEffect, useMemo, useState } from "react";
import InquiryForm from "../components/InquiryForm";
import { motion } from "framer-motion";
import { usePageContext } from "vike-react/usePageContext";
import FloatingCT from "../components/FloatingCT";
import Chatbot from "../components/Chatbot";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://novara-backend-one.vercel.app";
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[""''"'`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Modal Component
const BrochureModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const newErrors = {};
    if (!values.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!values.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(values.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => setErrors(validate(formData));

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/brochures/novara-brochure.pdf";
    link.download = "Novara-Nature-Estate-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_BASE}/pop-up`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          downloadPDF();
          const name = `${formData.firstName} ${formData.lastName}`.trim();
          setFormData({
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            message: "",
          });
          setErrors({});
          onClose();
          navigate("/thankyou");
          return;
        } else {
          alert("Something went wrong, please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form.");
      }
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6 lg:p-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1A614F] mb-2">Get Your Brochure</h2>
          <p className="text-gray-600 text-sm mb-6">Fill in your details and we'll send you our detailed brochure</p>
          <div className="space-y-4">
            {[
              { id: "firstName", label: "First Name *",    type: "text",  placeholder: "Enter your first name" },
              { id: "lastName",  label: "Last Name",       type: "text",  placeholder: "Enter your last name" },
              { id: "mobile",    label: "Mobile Number *", type: "tel",   placeholder: "10-digit mobile number" },
              { id: "email",     label: "Email Address",   type: "email", placeholder: "your.email@example.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  id={id} name={id} type={type}
                  onChange={handleChange} onBlur={handleBlur} value={formData[id]}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition ${errors[id] ? "border-red-500" : "border-gray-300"}`}
                  placeholder={placeholder}
                />
                {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message" name="message" rows="4"
                onChange={handleChange} onBlur={handleBlur} value={formData.message}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition resize-none ${errors.message ? "border-red-500" : "border-gray-300"}`}
                placeholder="Tell us what you're interested in..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>
            <button
              onClick={handleSubmit} disabled={isSubmitting}
              className="w-full bg-[#DCA000] hover:bg-[#E3A600] text-white font-semibold py-3 px-6 rounded-lg border border-[#FFCE4C] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit & Download"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BlogDetail({ vikeSlug }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const slug = vikeSlug;
  const blog = BLOGS.find((b) => b.slug === slug);

  // Pull a YouTube video id from any standard URL form (for the featured video)
  const getYouTubeId = (url = "") => {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };
  const videoId = getYouTubeId(blog?.videoUrl);

  const sections = blog?.sections?.length
    ? blog.sections
    : [{ type: "p", text: "Content not added yet. Add sections in src/data/blogs.js" }];

  const toc = useMemo(() => {
    const used = new Map();
    const items = [];
    sections.forEach((s) => {
      if (s.type !== "h3" || !s.text) return;
      const base = slugify(s.text);
      const count = (used.get(base) || 0) + 1;
      used.set(base, count);
      const id = count === 1 ? base : `${base}-${count}`;
      items.push({ id, text: s.text });
    });
    return items;
  }, [sections]);

  const [activeId, setActiveId] = useState(toc[0]?.id || "");

  useEffect(() => {
    if (!toc.length) return;
    const headingEls = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!headingEls.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "-25% 0px -65% 0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] },
    );
    headingEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  if (!blog) {
    return (
      <section className="w-full font-urbanist">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 py-10">
          <p className="text-slate-700">Blog not found.</p>
          <a href="/blogs" className="text-[#E3A600] no-underline font-semibold">Go back</a>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white font-urbanist">
     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');
        .blog-content, .blog-content * { font-family: 'Urbanist', 'Poppins', sans-serif !important; }
        .blog-content p,
        .blog-content ul li,
        .blog-content ol li { color: #111827 !important; font-size: 14px !important; font-weight: 400 !important; line-height: 1.7 !important; }
        .blog-content ul, .blog-content ol { color: #111827 !important; }
        .blog-content table td, .blog-content table th { color: #111827 !important; }
     `}</style>
     <Header />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 sm:py-10 flex">

          {/* Left social icons */}
          <div className="hidden lg:block w-[80px] mr-6">
            <div className="sticky top-64 flex flex-col gap-4">
              {[
                { href: "https://www.facebook.com/profile.php?id=61585877764871#", icon: <Facebook className="h-5 w-5" />, hover: "hover:bg-[#1877F2]" },
                { href: "https://wa.me/918660200662", icon: <MessageCircle className="h-5 w-5" />, hover: "hover:bg-[#25D366]" },
                { href: "https://www.instagram.com/novaranatureestates/", icon: <Instagram className="h-5 w-5" />, hover: "hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
                { href: "https://www.youtube.com/@NovaraNatureEstates", icon: <Youtube className="h-5 w-5" />, hover: "hover:bg-[#FF0000]" },
              ].map(({ href, icon, hover }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className={`h-10 w-10 rounded-full bg-[#FFF6E6] flex items-center justify-center text-[#8A8A8A] ${hover} hover:text-white transition`}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Blog content */}
          <div className="flex-1 max-w-4xl">
            <a href="/blogs" className="inline-flex no-underline items-center gap-2 text-[12px] font-semibold text-slate-700 hover:text-[#E3A600] transition">
              <span className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center">
                <ChevronLeft className="h-4 w-4" />
              </span>
              Back&nbsp;to&nbsp;Blog
            </a>

            <div className="mt-4">
              <span className="inline-flex rounded-full bg-[#E9FFF3] text-[#1B9A63] px-3 py-1 text-[11px] font-semibold">
                {blog.category}
              </span>
            </div>

            <h1 className="mt-3 text-[22px] sm:text-[28px] font-bold text-[#111827] leading-tight">
              {blog.headline}
            </h1>

            <div className="mt-2 text-[12px] text-slate-500 flex items-center gap-3">
              <span>{blog.author}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{blog.date}</span>
            </div>

            {/* Breadcrumb */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[12px] text-slate-400">
              <a href="/" className="hover:text-[#E3A600] transition-colors font-semibold">Home</a>
              <span className="text-slate-300 text-[10px]">{">>"}</span>
              <a href="/blogs" className="hover:text-[#E3A600] transition-colors font-semibold">Blog</a>
              <span className="text-slate-300 text-[10px]">{">>"}</span>
              <span className="text-slate-500 line-clamp-1 max-w-[420px] sm:max-w-[600px]">{blog.title}</span>
            </div>

            {/* Hero / featured image (acts as a video thumbnail when a video URL is set) */}
            <figure className="mt-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-100 group">
                <img
                  src={blog.heroImage || blog.image}
                  alt={blog.imageAlt || blog.title}
                  title={blog.imageTitle || undefined}
                  className="w-full h-auto object-cover"
                />
                {videoId && (
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    aria-label="Play video"
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors"
                  >
                    <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <svg viewBox="0 0 24 24" fill="#E3A600" width="30" height="30"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </button>
                )}
              </div>
              {blog.imageCaption && (
                <figcaption className="mt-2 text-[13px] text-slate-500 text-center">{blog.imageCaption}</figcaption>
              )}
            </figure>

            {/* Featured video lightbox */}
            {videoOpen && videoId && (
              <div
                className="fixed inset-0 z-[200] flex items-center justify-center px-4"
                style={{ background: "rgba(0,0,0,0.85)" }}
                onClick={() => setVideoOpen(false)}
              >
                <div className="relative w-full max-w-3xl" style={{ aspectRatio: "16/9" }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setVideoOpen(false)}
                    className="absolute -top-9 right-0 text-white text-sm font-semibold hover:text-[#E3A600]"
                  >
                    ✕ Close
                  </button>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full rounded-xl border-0"
                    title="Featured video"
                  />
                </div>
              </div>
            )}

            {/* ── Content sections ── */}
            <div className="mt-6 space-y-3 blog-content">
              {(() => {
                const used = new Map();
                // Strip any manual numbering an author already typed into a
                // question ("Q1. ", "1. ", "1) ") so every blog shows the
                // same clean "N. " prefix, no matter how it was authored.
                const stripManualNum = (t = "") => t.replace(/^\s*Q?\.?\s*\d+\s*[.):]\s*/i, "").trim();

                // Only treat an h2/h3 ending in "?" as an FAQ question once we're
                // past a real "FAQ" / "Frequently Asked Questions" heading —
                // otherwise an unrelated subheading that happens to end in "?"
                // would get mistaken for one.
                let faqLandmark = -1;
                sections.forEach((s, idx) => {
                  if ((s.type === "h2" || s.type === "h3") && /^(faqs?|frequently asked questions)/i.test((s.text || "").trim())) {
                    faqLandmark = idx;
                  }
                });

                // One pass, in document order, numbering every FAQ item from
                // whichever format it was authored in (heading+paragraph pairs,
                // an "ol" list of concatenated Q&A, or a schema-style "faq" block).
                let faqCount = 0;
                const questionNumbers = new Map(); // h2/h3 index -> number
                const olFaqStart = new Map();       // ol index -> starting number
                const faqTypeStart = new Map();     // faq-type index -> starting number
                sections.forEach((cur, idx) => {
                  if (!cur || faqLandmark === -1 || idx <= faqLandmark) return;
                  if (cur.type === "h2" || cur.type === "h3") {
                    const nxt = sections[idx + 1];
                    if ((cur.text || "").trim().endsWith("?") && nxt?.type === "p") {
                      faqCount += 1;
                      questionNumbers.set(idx, faqCount);
                    }
                  } else if (cur.type === "ol") {
                    const items = cur.text || [];
                    const isFaqStyle = items.length > 0 && items.every((item) => {
                      const qi = item.indexOf("?");
                      return qi > 0 && qi < item.length - 1;
                    });
                    if (isFaqStyle) {
                      olFaqStart.set(idx, faqCount + 1);
                      faqCount += items.length;
                    }
                  } else if (cur.type === "faq") {
                    const items = cur.items || [];
                    faqTypeStart.set(idx, faqCount + 1);
                    faqCount += items.length;
                  }
                });

                return sections.map((s, i) => {

                  // H2
                  if (s.type === "h2") {
                    const faqNum = questionNumbers.get(i);
                    if (faqNum) {
                      const cleanText = stripManualNum(s.text || "");
                      const base = slugify(cleanText);
                      const count = (used.get(base) || 0) + 1;
                      used.set(base, count);
                      const id = count === 1 ? base : `${base}-${count}`;
                      return (
                        <h3 key={i} id={id} className="scroll-mt-28 text-[16px] sm:text-[18px] font-bold text-[#111827]" style={{ textAlign: s.align || undefined }}>
                          {`${faqNum}. ${cleanText}`}
                        </h3>
                      );
                    }
                    return (
                      <h2 key={i} className="scroll-mt-28 text-[20px] sm:text-[24px] font-bold mt-4" style={{ textAlign: s.align || undefined }}>
                        {s.text}
                      </h2>
                    );
                  }

                  // H3
                  if (s.type === "h3") {
                    const faqNum = questionNumbers.get(i);
                    const cleanText = faqNum ? stripManualNum(s.text || "") : (s.text || "");
                    const base = slugify(cleanText);
                    const count = (used.get(base) || 0) + 1;
                    used.set(base, count);
                    const id = count === 1 ? base : `${base}-${count}`;
                    return (
                      <h3 key={i} id={id} className="scroll-mt-28 text-[16px] sm:text-[18px] font-bold text-[#111827]" style={{ textAlign: s.align || undefined }}>
                        {faqNum ? `${faqNum}. ${cleanText}` : cleanText}
                      </h3>
                    );
                  }

                  // H1 / H4 / H5 / H6
                  if (["h1", "h4", "h5", "h6"].includes(s.type)) {
                    const size = {
                      h1: "text-[24px] sm:text-[30px]",
                      h4: "text-[15px] sm:text-[16px]",
                      h5: "text-[13px] sm:text-[14px]",
                      h6: "text-[12px] sm:text-[13px]",
                    }[s.type];
                    const base = slugify(s.text || "");
                    const count = (used.get(base) || 0) + 1;
                    used.set(base, count);
                    const id = count === 1 ? base : `${base}-${count}`;
                    return createElement(
                      s.type,
                      { key: i, id, className: `scroll-mt-28 ${size} font-bold text-[#111827] mt-4`, style: { textAlign: s.align || undefined } },
                      s.text,
                    );
                  }

                  // Quote
                  if (s.type === "quote") {
                    return (
                      <div key={i} className="rounded-xl border border-[#F2E6C9] bg-[#FFF8E8] px-4 py-4 text-[13px] sm:text-[14px] text-slate-700">
                        <div className="border-l-4 border-[#E3A600] pl-3 italic leading-relaxed">{s.text}</div>
                      </div>
                    );
                  }

                  // Image
                  if (s.type === "image") {
                    const justify = s.alignment === "left" ? "flex-start" : s.alignment === "right" ? "flex-end" : "center";
                    const figStyle = { maxWidth: "100%", ...(s.imgWidth ? { width: s.imgWidth + "px" } : {}) };
                    const imgStyle = { width: "100%", height: "auto", display: "block" };
                    if (s.imgHeight) { imgStyle.height = s.imgHeight + "px"; imgStyle.objectFit = "cover"; }
                    const ytId = (() => {
                      const url = s.videoUrl || "";
                      if (!url) return null;
                      const vi = url.indexOf("v=");
                      if (vi !== -1) return url.slice(vi + 2).split("&")[0];
                      const parts = url.split("/");
                      const last = parts[parts.length - 1].split("?")[0];
                      return last.length === 11 ? last : null;
                    })();
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: justify }}>
                        <figure className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50" style={figStyle}>
                          <div className="relative group">
                            <img
                              src={s.src}
                              alt={s.alt || s.caption || "Blog image"}
                              title={s.title || undefined}
                              style={imgStyle}
                            />
                            {ytId && (
                              <button type="button" aria-label="Play video"
                                onClick={() => window.open(`https://www.youtube.com/watch?v=${ytId}`, "_blank")}
                                className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors">
                                <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                  <svg viewBox="0 0 24 24" fill="#E3A600" width="26" height="26"><path d="M8 5v14l11-7z"/></svg>
                                </span>
                              </button>
                            )}
                          </div>
                          {s.caption && <figcaption className="px-4 py-3 text-[12px] text-slate-500 text-center">{s.caption}</figcaption>}
                        </figure>
                      </div>
                    );
                  }

                  // Table
                  if (s.type === "table") {
                    return (
                      <div key={i} className="overflow-x-auto rounded-xl border border-[#1A614F]">
                        <table className="w-full text-[13px] sm:text-[14px] text-slate-600 leading-relaxed border-collapse">
                          <thead>
                            <tr>
                              {(s.headers || []).map((h, hi) => (
                                <th key={hi}
                                  className="text-left px-4 py-3 font-bold border border-[#1A614F] text-[#15302A]"
                                  style={{ background: s.themed ? "#e8dfa8" : "#EAF7F0" }}>
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(s.rows || []).map((row, ri) => (
                              <tr key={ri} style={{ background: s.themed ? (ri % 2 === 0 ? "#faf7ec" : "#f5f0d8") : (ri === 0 && !s.headers?.length ? "#EAF7F0" : "#ffffff") }}>
                                {row.map((cell, ci) => (
                                  // First row bold if no thead headers
                                  ri === 0 && !s.headers?.length
                                    ? <td key={ci} className="px-4 py-2.5 border border-[#1A614F] font-bold text-[#15302A]">{cell}</td>
                                    : <td key={ci} className="px-4 py-2.5 border border-[#1A614F] text-slate-600">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // FAQ (schema-style block) — plain numbered Q&A, same style as every other FAQ format
                  if (s.type === "faq") {
                    const startNum = faqTypeStart.get(i) || 1;
                    return (
                      <div key={i} className="space-y-3">
                        {(s.items || []).map((item, fi) => (
                          <div key={fi}>
                            <h3 className="scroll-mt-28 text-[16px] sm:text-[18px] font-bold text-[#111827]">
                              {`${startNum + fi}. ${stripManualNum(item.q || item.name || "")}`}
                            </h3>
                            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600">{item.a || item.text}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  // Unordered list
                  if (s.type === "ul") {
                    return (
                      <ul key={i} className="list-disc list-outside pl-5 space-y-1.5 text-[13px] sm:text-[14px] leading-relaxed text-[#111827]">
                        {(s.text || []).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  // Ordered list — detect FAQ-style items (question?answer concatenated) and render as cards
                  if (s.type === "ol") {
                    const items = s.text || [];
                    // Check if items look like concatenated Q+A (each contains a "?" not at the very end)
                    const isFaqStyle = items.length > 0 && items.every((item) => {
                      const qi = item.indexOf("?");
                      return qi > 0 && qi < item.length - 1;
                    });
                    if (isFaqStyle) {
                      const startNum = olFaqStart.get(i) || 1;
                      const faqItems = items.map((item) => {
                        const qi = item.indexOf("?");
                        return { q: item.slice(0, qi + 1).trim(), a: item.slice(qi + 1).trim() };
                      });
                      return (
                        <div key={i} className="space-y-3">
                          {faqItems.map((item, fi) => (
                            <div key={fi}>
                              <h3 className="scroll-mt-28 text-[16px] sm:text-[18px] font-bold text-[#111827]">
                                {`${startNum + fi}. ${stripManualNum(item.q)}`}
                              </h3>
                              <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600">{item.a}</p>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <ol key={i} className="list-decimal list-outside pl-5 space-y-1.5 text-[13px] sm:text-[14px] leading-relaxed text-[#111827]">
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ol>
                    );
                  }

                  if (s.type === "p_with_bold") {
                    return (
                      <p
                        key={i}
                        className="text-[13px] sm:text-[14px] leading-relaxed text-[#111827]"
                      >
                        {s.parts.map((part, idx) =>
                          part.bold ? (
                            <strong
                              key={idx}
                              className="font-semibold text-[#111827]"
                            >
                              {part.text}
                            </strong>
                          ) : (
                            <span key={idx}>{part.text}</span>
                          ),
                        )}
                      </p>
                    );
                  }

                  if (s.type === "p_with_link_bold") {
                    return (
                      <p
                        key={i}
                        className="text-[13px] sm:text-[14px] leading-relaxed text-[#111827]"
                      >
                        {s.partsBefore?.map((part, idx) =>
                          part.bold ? (
                            <strong
                              key={idx}
                              className="font-semibold text-[#111827]"
                            >
                              {part.text}
                            </strong>
                          ) : (
                            <span key={idx}>{part.text}</span>
                          ),
                        )}
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#DCA000] font-semibold no-underline hover:opacity-90"
                        >
                          {s.linkText}
                        </a>
                        {s.partsAfter?.map((part, idx) =>
                          part.bold ? (
                            <strong
                              key={idx}
                              className="font-semibold text-[#111827]"
                            >
                              {part.text}
                            </strong>
                          ) : (
                            <span key={idx}>{part.text}</span>
                          ),
                        )}
                      </p>
                    );
                  }

                  // Paragraph with link
                  if (s.type === "p_with_link") {
                    return (
                      <p key={i} className="text-[13px] sm:text-[14px] leading-relaxed text-[#111827]">
                        {s.textBefore && <span>{s.textBefore} </span>}
                        <a href={s.href} className="text-[#E3A600] font-semibold underline underline-offset-2 hover:opacity-80">
                          {s.linkText}
                        </a>
                        {s.textAfter && <span> {s.textAfter}</span>}
                      </p>
                    );
                  }

                  // Default paragraph (supports bold HTML)
                  // Convert <font color="X"> to <span style="color:X"> for reliable rendering
                  const cleanHtml = (s.text || "").replace(
                    /<font([^>]*)color=["']([^"']+)["']([^>]*)>/gi,
                    (_, pre, col, post) => `<span${pre}${post} style="color:${col}">`
                  ).replace(/<\/font>/gi, "</span>");
                  return (
                    <p
                      key={i}
                      className="text-[13px] sm:text-[14px] leading-relaxed text-[#111827]"
                      style={{ textAlign: s.align || undefined }}
                      dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    />
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {(() => {
          const related = BLOGS.filter(
            (b) => b.slug !== blog.slug && b.category === blog.category,
          ).slice(0, 3);

          if (!related.length) return null;

          return (
            <div className="py-8 border-t border-slate-100">
              <h2 className="text-[24px] text-center sm:text-[32px] font-urbanist font-bold text-[#111827] mb-6">
                Related Articles
              </h2>
              <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                {related.map((b) => (
                  <a key={b.id} href={`/blogs/${b.slug}`}
                    className="no-underline group rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow w-[380px] h-[380px] sm:w-[calc(50%-12px)] sm:h-auto lg:w-[calc(33.333%-16px)] flex flex-col">
                    <div className="overflow-hidden h-[220px] sm:h-[180px] bg-slate-100 flex-shrink-0">
                      <img
                        src={b.heroImage || b.image}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <span className="inline-flex rounded-full bg-[#E9FFF3] w-[70px] text-center text-[#1B9A63] px-2 py-0.5 text-[10px] font-semibold mb-2">
                        {b.category}
                      </span>
                      <h3 className="text-[14px] sm:text-[14px] font-bold text-[#111827] leading-snug group-hover:text-[#1A614F] transition-colors line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-[12px] text-slate-500 line-clamp-3">{b.description}</p>
                      <span className="mt-auto inline-flex items-center gap-1 text-[14px] lg:mt-2 font-semibold text-[#E3A600] group-hover:gap-2 transition-all">
                        Read more
                        <ChevronLeft className="h-3 w-3 rotate-180" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      <FloatingCT />
      <BrochureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Chatbot />
      <Footer />
    </section>
  );
}