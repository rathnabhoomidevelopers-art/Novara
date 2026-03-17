// pages/blogs/+Page.jsx
import Header from "../components/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { BLOGS } from "../data/blogs";
import { useState } from "react";
import { DownloadIcon } from "lucide-react";
import Chatbot from "../components/Chatbot";
import { navigate } from "vike/client/router"; // ✅ Vike navigation
import FloatingCT from "../components/FloatingCT";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://novara-backend-one.vercel.app";

const smoothSpring = { type: "spring", stiffness: 80, damping: 18, mass: 0.9 };

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: smoothSpring },
};

const staggerWrap = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

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

  const handleBlur = () => {
    setErrors(validate(formData));
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
          // ✅ Vike navigate (replaces useNavigate hook)
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
            {[
              {
                id: "firstName",
                label: "First Name *",
                type: "text",
                placeholder: "Enter your first name",
              },
              {
                id: "lastName",
                label: "Last Name",
                type: "text",
                placeholder: "Enter your last name",
              },
              {
                id: "mobile",
                label: "Mobile Number *",
                type: "tel",
                placeholder: "10-digit mobile number",
              },
              {
                id: "email",
                label: "Email Address",
                type: "email",
                placeholder: "your.email@example.com",
              },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData[id]}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A614F] transition ${errors[id] ? "border-red-500" : "border-gray-300"}`}
                  placeholder={placeholder}
                />
                {errors[id] && (
                  <p className="mt-1 text-xs text-red-500">{errors[id]}</p>
                )}
              </div>
            ))}
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

export default function Blogs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-urbanist">
      <Header />

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerWrap}
        style={{
          backgroundImage: "url('/images/blog_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-[300px] px-2 lg:h-[400px] flex flex-col items-center justify-center relative"
      >
        <motion.div
          variants={fadeUp}
          className="relative z-10 text-center text-white font-brushelva lg:w-[700px]"
        >
          <h1 className="text-[30px] lg:text-[50px] sm:text-[32px]">
            Farmland Investment Insights & Guides.
          </h1>
        </motion.div>
      </motion.div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7">
          {BLOGS.map((blog) => (
            <div
              key={blog.id}
              className="rounded-[22px] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="overflow-hidden rounded-[16px]">
                {/* ✅ Plain <a> replaces <Link> */}
                <a href={`/blogs/${blog.slug}`}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="lg:h-[200px] w-full object-cover"
                  />
                </a>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="w-full">
                  <span className="inline-block rounded-full bg-[#E9FFF3] px-3 py-1 text-[12px] font-medium text-[#1B9A63]">
                    {blog.category}
                  </span>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h2 className="text-[16px] lg:text-[20px] font-semibold leading-snug text-[#0F172A]">
                      {blog.title}
                    </h2>
                    {/* ✅ Plain <a> replaces <Link> */}
                    <a
                      href={`/blogs/${blog.slug}`}
                      className="flex w-[48px] h-[48px] shrink-0 items-center justify-center rounded-full bg-[#E3A600] text-white transition hover:scale-105"
                    >
                      <img src="/images/arrow_1.png" alt="Arrow" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating WhatsApp + Call */}
      <FloatingCT/>

      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Chatbot />
      <Footer />
    </div>
  );
}
