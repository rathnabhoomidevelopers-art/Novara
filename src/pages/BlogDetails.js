// src/pages/BlogDetail.js
import {
  ChevronLeft,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
  DownloadIcon,
  Instagram,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BLOGS } from "../data/blogs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useMemo, useState } from "react";
import InquiryForm from "../components/InquiryForm";
import { motion } from "framer-motion";

const API_BASE =
  process.env.REACT_APP_API_BASE || "https://novara-backend-one.vercel.app";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[“”‘’"'`]/g, "")
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
  const navigate = useNavigate();
  const validate = (values) => {
    const newErrors = {};

    // Required fields
    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!values.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(values.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    // Optional fields – validate ONLY if entered
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.text();
        if (response.ok) {
          // Optional: remove alert to avoid blocking navigation
          // alert(data);

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

          navigate("/thankyou", {
            state: {
              name,
              phone: formData.mobile,
            },
          });

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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 lg:p-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1A614F] mb-2">
            Get Your Brochure
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Fill in your details and we'll send you our detailed brochure
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.firstName}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.lastName}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number *
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.mobile}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                placeholder="10-digit mobile number"
              />
              {errors.mobile && (
                <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.email}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.message}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition resize-none ${errors.message ? "border-red-500" : "border-gray-300"}`}
                placeholder="Tell us what you're interested in..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
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

export default function BlogDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { slug } = useParams();
  const blog = BLOGS.find((b) => b.slug === slug);

  const sections = blog?.sections?.length
    ? blog.sections
    : [
        {
          type: "p",
          text: "Content not added yet. Add sections in src/data/blogs.js",
        },
      ];

  // Build TOC from h3 headings
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

    const headingEls = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);
    if (!headingEls.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          )[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      },
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
          <Link
            to="/blogs"
            className="text-[#E3A600] no-underline font-semibold"
          >
            Go back
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white font-urbanist">
      <Header />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 sm:py-10 flex">
          {/* Left social icons */}
          <div className="hidden lg:block w-[80px] mr-6">
            <div className="sticky top-64 flex flex-col gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61585877764871#"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#FFF6E6] flex items-center justify-center text-[#8A8A8A] hover:bg-[#1877F2] hover:text-white transition"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://wa.me/918660200662"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#FFF6E6] flex items-center justify-center text-[#8A8A8A] hover:bg-[#25D366] hover:text-white transition"
              >
                <MessageCircle className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/novaranatureestates/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#FFF6E6] flex items-center justify-center text-[#8A8A8A] hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white transition"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com/@NovaraNatureEstates"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#FFF6E6] flex items-center justify-center text-[#8A8A8A] hover:bg-[#FF0000] hover:text-white transition"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Blog content */}
          <div className="flex-1 max-w-6xl">
            <Link
              to="/blogs"
              className="inline-flex no-underline items-center gap-2 text-[12px] font-semibold text-slate-700 hover:text-[#E3A600] transition"
            >
              <span className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center">
                <ChevronLeft className="h-4 w-4" />
              </span>
              Back&nbsp;to&nbsp;Blog
            </Link>

            <div className="mt-4">
              <span className="inline-flex rounded-full bg-[#E9FFF3] text-[#1B9A63] px-3 py-1 text-[11px] font-semibold">
                {blog.category}
              </span>
            </div>

            <h1 className="mt-3 text-[22px] sm:text-[28px] font-bold text-[#111827] leading-tight">
              {blog.title}
            </h1>

            <div className="mt-5 rounded-2xl overflow-hidden border border-slate-100 bg-slate-100">
              <img
                src={blog.heroImage || blog.image}
                alt={blog.title}
                className="w-full h-[210px] sm:h-full object-cover"
              />
            </div>

            {/* content */}
            <div className="mt-6 space-y-5">
              {(() => {
                const used = new Map();

                return sections.map((s, i) => {
                  if (s.type === "h3") {
                    const base = slugify(s.text || "");
                    const count = (used.get(base) || 0) + 1;
                    used.set(base, count);
                    const id = count === 1 ? base : `${base}-${count}`;

                    return (
                      <h3
                        key={i}
                        id={id}
                        className="scroll-mt-28 text-[16px] sm:text-[18px] font-bold text-[#111827]"
                      >
                        {s.text}
                      </h3>
                    );
                  }

                  if (s.type === "quote") {
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-[#F2E6C9] bg-[#FFF8E8] px-4 py-4 text-[13px] sm:text-[14px] text-slate-700"
                      >
                        <div className="border-l-4 border-[#E3A600] pl-3 italic leading-relaxed">
                          {s.text}
                        </div>
                      </div>
                    );
                  }

                  if (s.type === "image") {
                    return (
                      <figure
                        key={i}
                        className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50"
                      >
                        <img
                          src={s.src}
                          alt={s.caption || "Blog image"}
                          className="w-full h-auto"
                        />
                        {s.caption ? (
                          <figcaption className="px-4 py-3 text-[12px] text-slate-500">
                            {s.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  }

                  if (s.type === "ul") {
                    return (
                      <ul
                        key={i}
                        className="list-disc list-outside pl-5 space-y-2 text-[13px] sm:text-[14px] text-slate-600"
                      >
                        {s.text.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600"
                    >
                      {s.text}
                    </p>
                  );
                });
              })()}
            </div>
          </div>

          {/* Right TOC */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-[390px]  ml-6">
              <div className="sticky top-36">
                <InquiryForm />
              </div>
            </aside>
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9 }}
        className="fixed bottom-16 lg:bottom-5 right-9 lg:right-4 z-[9999] flex flex-col items-end gap-4 font-poppins"
      >
        <a
          href="https://wa.me/918660200662"
          target="_blank"
          rel="noopener noreferrer"
          className=" whatsapp-chat
            sm:hidden
            w-12 h-12
            rounded-xl
            bg-[#25D366]
            flex items-center justify-center
            shadow-[0_12px_30px_rgba(0,0,0,0.25)]
          "
        >
          <img
            src="/images/whatsapp.svg"
            alt="whatsapp"
            className="w-7 h-7 text-white"
          />
        </a>

        <a
          href="https://wa.me/918660200662"
          target="_blank"
          rel="noopener noreferrer"
          className=" whatsapp-chat-gtm
            hidden sm:inline-flex
            group no-underline relative items-center
            bg-white
            pl-3 pr-[70px] py-3
            rounded-xl
            shadow-[0_12px_35px_rgba(0,0,0,0.18)]
            hover:scale-[1.02] transition-transform
          "
        >
          <span className="text-slate-800 group-hover:text-green-600 font-semibold text-base whitespace-nowrap transition-colors">
            WhatsApp
          </span>

          <span
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              w-11 h-11 rounded-xl
              bg-[#25D366]
              flex items-center justify-center
              shadow-[0_6px_16px_rgba(0,0,0,0.12)]
            "
          >
            <img
              src="/images/whatsapp.svg"
              alt="whatsapp"
              className="w-7 h-7 text-white"
            />
          </span>
        </a>

        <a
          href="tel:+918660200662"
          className=" tel-chat
            sm:hidden
            w-12 h-12
            rounded-xl
            bg-[#3B46F6]
            flex items-center justify-center
            shadow-[0_12px_30px_rgba(0,0,0,0.25)]
          "
        >
          <img
            src="/images/call_ico.svg"
            alt="call"
            className="w-7 h-7 text-white"
          />
        </a>

        <a
          href="tel:+918660200662"
          className=" tel-chat-gtm
            hidden sm:inline-flex
            group no-underline relative items-center
            bg-white
            pl-3 pr-[66px] py-3
            rounded-xl
            shadow-[0_12px_35px_rgba(0,0,0,0.18)]
            hover:scale-[1.02] transition-transform
          "
        >
          <span className="text-slate-800 group-hover:text-[#3B46F6] font-semibold text-base whitespace-nowrap transition-colors">
            +91 8660200662
          </span>

          <span
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              w-11 h-11 rounded-xl
              bg-[#3B46F6]
              flex items-center justify-center
              shadow-[0_6px_16px_rgba(0,0,0,0.12)]
            "
          >
            <img
              src="/images/call_ico.svg"
              alt="call"
              className="w-7 h-7 text-white"
            />
          </span>
        </a>
      </motion.div>

      <div className="block">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.9,
          }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-16 lg:bottom-5 left-6 lg:left-4 z-[9999] bg-[#cd6701] lg:bg-white cursor-pointer flex flex-col lg:flex-row items-center lg:gap-[12px] p-[6px] lg:p-[12px] rounded-lg font-poppins shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
        >
          {/* Text → only on desktop */}
          <span className="lg:inline text-[#ffff] lg:text-[#2b2b2b] lg:hover:text-[#964B00] font-semibold text-base whitespace-nowrap transition-colors">
            Get Brochure
          </span>

          {/* Icon → always visible */}
          <button
            type="button"
            className="bg-[#cd6701] text-white p-1 lg:p-2 rounded-lg"
          >
            <DownloadIcon />
          </button>
        </motion.div>
      </div>
      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </section>
  );
}
