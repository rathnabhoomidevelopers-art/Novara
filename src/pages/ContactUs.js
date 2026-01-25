import { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { DownloadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch("http://localhost:3001/pop-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.text();
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

export function ContactUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Header />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerWrap}
        className="h-[215px] lg:h-[315px] bg-gradient-to-r from-[#D3FFE5] via-[#ffff] to-[#ffff] flex flex-col py-[50px] px-[16px] lg:py-[100px] lg:px-[80px] relative"
      >
        <motion.h1
          variants={fadeUp}
          className="relative z-10 text-start font-brushelva text-[30px] sm:text-[32px] lg:text-[38px] lg:w-[1070px] text-[#1A614F]"
        >
          Get in Touch with Novara
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="relative z-10  text-[#2B2B2B] font-urbanist  text-[14px] sm:text-[14px] mt-[10px] lg:mt-[10px] lg:w-[1160px] lg:text-[16px]"
        >
          Welcome to Estatein's Contact Us page. We're here to assist you with
          any inquiries, requests, or feedback you may have.
        </motion.p>
      </motion.div>

      <div className=" lg:h-[180px] font-urbanist bg-[#52A09A] p-[10px]">
        <div className=" flex flex-col gap-2 justify-center lg:flex-row">
          <div className="flex gap-2 flex-row">
            <div className="relative bg-white flex flex-col justify-center items-center h-[123px] w-[180px] lg:h-[160px] rounded-lg lg:w-[340px]">
              <img src="/images/mail.svg" className="h-[60px] w-[60px]" />
              <a
                href="mailto:info@novaranatureestate.com"
                className="absolute top-2 right-2 lg:top-5 lg:right-5"
              >
                <img src="/images/nav.svg" />
              </a>
              <a
                href="mailto:info@novaranatureestate.com"
                className="text-[#1A614F] pt-3 text-[12px] lg:text-[16px] no-underline font-semibold "
              >
                info@novaranatureestate.com
              </a>
            </div>

            <div className="relative bg-white flex flex-col justify-center items-center h-[123px] w-[180px] lg:h-[160px] rounded-lg lg:w-[340px]">
              <img src="/images/call.svg" className="h-[60px] w-[60px]" />
              <a
                target="_blank"
                href="tel:+918660200662"
                className="absolute top-2 right-2 lg:top-5 lg:right-5"
              >
                <img src="/images/nav.svg" />
              </a>
              <a
                href="tel:+918660200662"
                target="_blank"
                className="text-[#1A614F] pt-3 text-[12px] lg:text-[16px] no-underline font-semibold "
              >
                +91-8660200662
              </a>
            </div>
          </div>

          <div className="flex gap-2 flex-row">
            <div className="relative bg-white flex flex-col justify-center items-center h-[123px] w-[180px] lg:h-[160px] rounded-lg lg:w-[340px]">
              <img src="/images/address.svg" className="h-[60px] w-[60px]" />
              <a
                target="_blank"
                href="mailto:info@novaranatureestate.com"
                className="absolute top-5 right-5"
              >
                <img src="/images/nav.svg" />
              </a>

              <a
                href="https://maps.app.goo.gl/z56qpEh3TR1jvqSQ8"
                target="_blank"
                className="text-[#1A614F] pt-3 text-[12px] lg:text-[16px] no-underline font-semibold "
              >
                View Address
              </a>
            </div>
            <div className="relative bg-white flex flex-wrap lg:flex-col justify-center items-center h-[123px] w-[180px] lg:h-[160px] rounded-lg lg:w-[340px]">
              <img src="/images/meta.svg" className="h-[60px] w-[60px]" />
              <a href="" className="absolute top-5 right-5">
                <img src="/images/nav.svg" />
              </a>
              <span className="flex gap-2 lg:gap-3">
                {" "}
                <a
                  href="https://www.instagram.com/novaranatureestates/"
                  target="_blank"
                  className="text-[#1A614F] pt-3 text-[12px] lg:text-[16px] no-underline font-semibold "
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@NovaraNatureEstates"
                  target="_blank"
                  className="text-[#1A614F] pt-3 text-[12px] lg:text-[16px] no-underline font-semibold "
                >
                  YouTube
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61585877764871#"
                  target="_blank"
                  className="text-[#1A614F] pt-3 text-[12px] lg:text-[16px] no-underline font-semibold "
                >
                  Facebook
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="lg:h-[999px] lg:mt-[60px]  lg:py-[80px] lg:px-[80px]"
        style={{
          backgroundImage: "url('/images/contact-form.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-[#FFD972] px-[18px] pt-[10px] text-[28px] lg:text-[50px] font-brushelva">
          Let's Connect
        </div>
        <p className="text-white px-[18px] pt-[10px] text-[14px] lg:text-[16px] mt-3 lg:w-[1030px] font-urbanist">
          We're excited to connect with you and learn more about your real
          estate goals. Use the form below to get in touch with Estatein.
          Whether you're a prospective client, partner, or simply curious about
          our services, we're here to answer your questions and provide the
          assistance you need.
        </p>

        <ContactForm />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9 }}
        className="fixed bottom-5 right-4 z-[9999] flex flex-col items-end gap-4 font-poppins"
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
          className="fixed bottom-6 left-4 z-[9999] bg-white cursor-pointer flex flex-row items-center gap-3 p-2 rounded-lg font-poppins shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
        >
          {/* Text → only on desktop */}
          <span className="hidden lg:inline text-[#2b2b2b] hover:text-[#964B00] font-semibold text-base whitespace-nowrap transition-colors">
            Get Brochure
          </span>

          {/* Icon → always visible */}
          <button
            type="button"
            className="bg-[#964B00] text-white p-2 rounded-lg"
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
    </div>
  );
}