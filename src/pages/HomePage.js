import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import OurStorySection from "../components/OurStorySection";
import EcovaraHeroBlock from "../components/EcovaraHeroBlock";
import EcovaraPhotoGallery from "../components/EcovaraPhotoGallery";
import FarmlandSmartChoiceSection from "../components/FarmlandSmartChoiceSection";
import { Link, useNavigate } from "react-router-dom";
import TestimonialsCarousel from "../components/Carousel";
import CTAStrip from "../components/CTAStrip";
import { BLOGS } from "../data/blogs";
import Footer from "../components/Footer";
import { useState } from "react";
import { DownloadIcon, Images } from "lucide-react";
import Chatbot from "../components/Chatbot";
import { ClientTestimonials } from "../components/Clienttestimonials";
import ClientFAQ from "../components/ClientFAQ";

const API_BASE =
  process.env.REACT_APP_API_BASE || "https://novara-backend-one.vercel.app";

const smoothSpring = { type: "spring", stiffness: 80, damping: 18, mass: 0.9 };

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: smoothSpring },
};

const stats = [
  { value: "1000+", label: "Trees" },
  { value: "80%", label: "Open Space" },
  { value: "15", label: "Acres Project" },
];

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

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blogCards = [
    {
      id: 1,
      imgSrc: "/images/blog_1.png",
      altText: "Sustainable Farmland",
      tag: "Sustainable Farmland",
      title: "10 Innovative Sustainable Farming Practices for Eco Farmlands",
      link: "/",
    },
    {
      id: 2,
      imgSrc: "/images/blog_1.png",
      altText: "Investments",
      tag: "Investments",
      title: "Is Buying Farmland Near Bangalore Safe in 2025?",
      link: "/",
    },
    {
      id: 3,
      imgSrc: "/images/blog_1.png",
      altText: "Managed Farmlands",
      tag: "Managed Farmlands",
      title: "Why to Buy Farmland Near Bangalore",
      link: "/",
    },
  ];

  const amenitiesCard = [
    {
      id: 1,
      imgSrc: "/images/organic_icon.svg",
      title: "Organic Farming",
      description:
        "Dedicated space for organic farming, allowing you to grow healthy, chemical-free produce naturally.",
    },
  ];

  const destinations = [
    { name: "Lepakshi Temple", time: "10 Mins" },
    { name: "Hindupuram Town", time: "10 Mins" },
    { name: "Bagepalli Toll Plaza", time: "20 Mins" },
    { name: "Penukonda Fort", time: "30 Mins" },
    { name: "Isha Foundation", time: "50 Mins" },
    { name: "Nandhi Hills", time: "60 Mins" },
    { name: "Devanahalli", time: "65 Mins" },
    { name: "KIA Airport Devanahalli", time: "75 Mins" },
  ];

  const amenitiesCards = [
    {
      id: 1,
      imgSrc: "/images/club_house_icon.svg",
      title: "Clubhouse",
      description:
        "An exclusive clubhouse offering comfortable spaces for leisure, events, and social interaction.",
    },
    {
      id: 2,
      imgSrc: "/images/kids_play_icon.svg",
      title: "Kids Play Area",
      description:
        "A safe and fun play area designed for children to enjoy outdoor activities in a secure, natural environment.",
    },
    {
      id: 3,
      imgSrc: "/images/swimming_icon.svg",
      title: "Swimming Pool",
      description:
        "Enjoy a refreshing swim in a well-designed pool that adds comfort, leisure, and a resort-style feel.",
    },
  ];

  const latestBlogs = BLOGS.slice(0, 3);

  return (
    <div className="font-urbanist">
      <Helmet>
        <title>
          Managed Farmlands Near Bangalore | Novara Nature Estate
        </title>
        <meta
          name="description"
          content="Invest in managed farmlands near Bangalore with Novara Nature Estate. Enjoy hassle-free ownership, expert maintenance, and high-return agricultural investments."
        />
        <meta
          name="keywords"
          content="Managed Farmlands Near Bangalore"
        />
        <link
          rel="canonical"
          href="https://www.novaranatureestates.com"
        />
      </Helmet>
      <Header />
      {/* HERO */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerWrap}
        className="h-[400px] px-2 lg:h-[600px] flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/homepage.webp"
        />

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/35"></div>

        <motion.h1
          variants={fadeUp}
          className="relative z-10 text-center text-white font-brushelva text-[22px] sm:text-[32px] lg:text-[64px] lg:w-[1200px]"
        >
          Premium Managed Farmland Near North Bangalore With Novara Nature
          Estates
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="relative z-10 text-center font-urbanist text-white/80 text-[14px] lg:w-[850px] sm:text-[14px] mt-[10px] lg:mt-[20px] lg:text-[24px]"
        >
          Discover managed farmlands near Bangalore North with clear titles,
          prime locations, and expert management.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="relative z-10 mt-[20px] lg:mt-[40px] flex justify-center"
        >
          <Link
            to="/contactus"
            className="
              w-[200px] h-[50px] sm:w-[200px] sm:h-[60px]
              inline-flex items-center justify-center
              rounded-full
              px-4 py-3 sm:px-5 sm:py-4
              text-[14px] sm:text-[16px] lg:text-[18px]
              font-urbanist font-semibold
              shadow-lg
              bg-[#DCA000] hover:bg-[#DCA000]/90
              text-white
              no-underline
              transition-all duration-300
              hover:scale-105
            "
          >
            Book a Farm Visit
          </Link>
        </motion.div>
      </motion.div>

      <motion.div>
        <OurStorySection />
      </motion.div>
      <EcovaraHeroBlock />
      <EcovaraPhotoGallery />
      <FarmlandSmartChoiceSection />
      <div
        style={{ backgroundImage: "url('/images/background.webp')" }}
        className="h-[780px] lg:h-[669px] bg-gradient-to-b from-[#D3FFE5] via-[#D3FFE5] to-[#FEFFFF]"
      >
        {/* ONE wrapper controlling order */}
        <div className="flex flex-col items-center justify-center gap-6 lg:gap-0 lg:relative">
          {/* ORDER 1: Title */}
          <div className="order-1 w-full px-[20px] lg:px-[80px]">
            <div className="font-brushelva pt-10">
              <img src="/images/updated_icon.svg" alt="sparkle" />
              <div className="text-[18px] lg:text-[24px] text-[#FFC62C] mt-2">
                Ecovara Farms
              </div>
              <div className="text-[38px] lg:text-[48px] text-white">
                Location Highlights
              </div>
            </div>
          </div>

          {/* ORDER 2: Location Image */}
          <div className="order-2 relative z-10 lg:left-64 lg:-mt-[160px]">
            <img
              src="/images/location.webp"
              className="w-full max-w-[370px] lg:max-w-[940px]"
              alt="Location"
            />
          </div>

          {/* ORDER 3: Location Highlights List */}
          <div className="order-3 flex items-center font-urbanist mt-[12px] lg:mt-[1px] w-[309px] h-[276px] lg:w-[400px] lg:h-[352px] justify-center lg:absolute lg:left-[80px] lg:top-[220px]">
            <div className="bg-white/80 rounded-lg shadow-lg py-2 px-3 w-full max-w-md">
              {destinations.map((destination, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto_1fr] items-center py-2  border-b border-[#D5FFE6] last:border-b-0"
                >
                  <span className="text-[#1A614F] text-[12px] lg:text-[16px] font-medium text-left">
                    {destination.name}
                  </span>

                  <span className="h-5 lg:h-6 w-px ms-3 bg-[#1A614F]"></span>

                  <span className="text-[#1A614F] text-[12px] lg:text-[16px] font-bold text-right lg:pe-[80px] whitespace-nowrap">
                    {destination.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full lg:w-full lg:h-[860px] lg:px-[120px] pb-[20px] py-[16px] lg:py-[89px] bg-cover bg-center bg-no-repeat overflow-x-hidden"
        style={{ backgroundImage: "url('/images/amenities_bg.webp')" }}
      >
        <div className="text-[#FFD972] px-3 text-[28px] lg:text-[50px] font-brushelva">
          Our Amenities
        </div>
        <p className="text-white text-[14px] lg:text-[16px] px-3 mt-3 lg:w-[1030px] font-urbanist">
          Our managed farmlands near Bangalore offer world-class amenities
          designed for a sustainable lifestyle. Enjoy lush green landscapes,
          open spaces, and modern infrastructure, including well-planned roads,
          24/7 security, and reliable water supply, all ensuring a comfortable
          living experience with easy access to key landmarks.
        </p>
        <div className="flex flex-col lg:flex-row lg:ms-6 gap-[16px] mt-4 lg:w-[1200px]">
          {amenitiesCards.map((card) => (
            <div
              key={card.id}
              className="bg-white font-urbanist mx-auto w-full max-w-[340px] lg:max-w-[380px] rounded rounded-3 lg:h-[236px] p-[20px] lg:p-[40px]"
            >
              <div className="flex align-items-center">
                <div>
                  <img src={card.imgSrc} />
                </div>
                <div className="ps-3 lg:text-[20px] text-[#1A614F] font-semibold">
                  {card.title}
                </div>
              </div>
              <div className="mt-[18px] lg:w-[320px] text-[14px] lg:text-[16px]">
                {card.description}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row  gap-[16px] sm:ms-0 md-ms-0 lg:ms-6 lg:gap-[16px] mt-[16px] lg:mt-[20px] lg:w-[1200px]">
          {amenitiesCard.map((card) => (
            <div
              key={card.id}
              className="bg-white font-urbanist mx-auto w-full max-w-[340px] lg:max-w-[380px] rounded rounded-3 lg:h-[236px] p-[20px] lg:p-[40px]"
            >
              <div className="flex align-items-center">
                <div>
                  <img src={card.imgSrc} />
                </div>
                <div className="ps-3 lg:text-[20px] text-[#1A614F] font-semibold">
                  {card.title}
                </div>
              </div>
              <div className="mt-[18px] text-[14px] lg:text-[16px]">
                {card.description}
              </div>
            </div>
          ))}

          <div
            style={{ backgroundImage: "url('/images/cta_background.webp')" }}
            className="bg-no-repeat bg-center bg-cover mx-auto text-white font-urbanist w-full max-w-[340px] lg:max-w-none lg:w-[780px] rounded-3 py-[24px] px-[20px] lg:h-[236px] lg:py-[60px] lg:p-[40px]"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              {/* Left side (Title + Description) */}
              <div className="order-1 lg:flex-1 lg:mr-6">
                <div className="text-[20px] lg:text-[24px] font-bold">
                  Unlock the Value of Your Property Today
                </div>
                <div className="mt-[10px] text-[#E2DFDF] text-[14px] lg:text-[16px] lg:max-w-[600px]">
                  Ready to unlock the true value of your property? Explore our
                  Property Selling Service categories and let us help you
                  achieve the best deal possible for your valuable asset.
                </div>
              </div>

              {/* Button (last on mobile, right on desktop) - ADDED ONCLICK */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="order-2 lg:order-2 mt-[20px] lg:mt-0 lg:flex-shrink-0 bg-[#DCA000] text-center no-underline rounded-lg border border-[#FFCE4C] text-[14px] px-[20px] py-[14px] lg:px-[40px] text-white w-full lg:w-auto hover:bg-[#E3A600] transition"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
      <ClientTestimonials/>

      <div className="lg:h-[690px] lg:px-[100px] py-5 lg:py-[90px] bg-cover bg-center bg-no-repeat"
      style={{backgroundImage:"url('/images/blog-bg.webp')"}}
      >
        <div className="text-[24px] lg:text-[44px] text-[#FFC62C] font-brushelva text-center">
          Our Latest Blogs
        </div>

        {/* optional: view all button */}
        <div className="mt-3 flex justify-center">
          <Link
            to="/blogs"
            className="no-underline font-urbanist text-[14px] font-semibold text-[#1A614F] hover:text-[#E3A600] transition"
          >
            View all blogs →
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-[30px] mt-[24px]">
          {latestBlogs.map((blog) => (
            <div
              key={blog.id}
              className="w-[351px] h-[350px] lg:w-[400px] lg:h-[380px] rounded-[22px] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-[16px]">
                <Link to={`/blogs/${blog.slug}`}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-[200px] w-full object-cover"
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="mt-3 flex font-urbanist items-start justify-between gap-3">
                <div>
                  {/* Tag */}
                  <span className="inline-block rounded-full bg-[#E9FFF3] px-3 py-1 text-[12px] font-medium text-[#1B9A63]">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <div className="flex justify-between items-center mt-2">
                    <h3 className=" text-[16px] lg:text-[20px] lg:w-[250px] font-semibold leading-snug text-[#0F172A]">
                      {blog.title}
                    </h3>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="flex w-[48px] ms-14 mb-4 h-[48px] shrink-0 items-center justify-center rounded-full bg-[#E3A600] text-white transition hover:scale-105"
                    >
                      <img src="/images/arrow_1.png" alt="Arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <ClientFAQ/>
      </div>

      {/* <div className="overflow-x-clip">
        <TestimonialsCarousel />
      </div> */}
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

      <div className="bg-yellow-50/50">
        <CTAStrip
        title="Start Managed Farming Today"
        description="Enjoy hassle-free farming with expert care, regular maintenance, and sustainable practices that help your land grow in value and productivity."
        ctaText="Book a Farm Visit"
      />
      </div>
      <Chatbot/>
      <Footer />

      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
