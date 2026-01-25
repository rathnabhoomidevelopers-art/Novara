import Header from "../components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, DownloadIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import EcovaraPhotoGallery from "../components/EcovaraPhotoGallery";
import EcovaraInquiryForm from "../components/EcovaraInquiryForm";
import CTAStrip from "../components/CTAStrip";
import Footer from "../components/Footer";
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

const DEFAULT_IMAGES = [
  {
    src: "/images/default_1.webp",
    alt: "Pool & Villa",
  },
  {
    src: "/images/default_2.webp",
    alt: "Forest Cottage",
  },
  {
    src: "/images/default_3.webp",
    alt: "Sunset View",
  },
  {
    src: "/images/default_1.webp",
    alt: "Pool & Villa",
  },
  {
    src: "/images/default_2.webp",
    alt: "Forest Cottage",
  },
  {
    src: "/images/default_3.webp",
    alt: "Sunset View",
  },
];

const amenitiesCard = [
  {
    id: 1,
    imgSrc: "/images/track.svg",
    title: "Jogging Track & Pet Route",
    description:
      "A dedicated pathway for jogging and pet walks, surrounded by greenery perfect for fitness, relaxation.",
  },
];

const amenitiesCards = [
  {
    id: 1,
    imgSrc: "/images/tree.svg",
    title: "64+ Tree Plantation",
    description:
      "A rich plantation of over 64 varieties of trees, enhancing greenery, biodiversity, and long-term land value.",
  },
  {
    id: 2,
    imgSrc: "/images/lotus.svg",
    title: "Lotus Pond / Fish Pond",
    description:
      "A serene water feature that enhances natural beauty, promotes calm surroundings, and adds to the peaceful living experience.",
  },
  {
    id: 3,
    imgSrc: "/images/fire.svg",
    title: "Campfire / Rain Dance Area",
    description:
      "Enjoy relaxing campfire evenings and fun rain dance moments perfect for leisure, celebrations, and memorable weekends.",
  },
];

const amenitiesCarded = [
  {
    id: 4,
    imgSrc: "/images/security.svg",
    title: "24/7 Security Checkho",
    description:
      "Round-the-clock security with controlled access to ensure a safe, secure, and worry-free environment at all times.",
  },
  {
    id: 5,
    imgSrc: "/images/solar.svg",
    title: "Solar Street Lights",
    description:
      "Eco-friendly solar street lighting that ensures safe pathways while supporting sustainable and energy-efficient living.",
  },
  {
    id: 6,
    imgSrc: "/images/cafeteria.svg",
    title: "Cafeteria",
    description:
      "A cozy cafeteria offering a relaxed space to enjoy refreshments and spend quality time with family and visitors.",
  },
];

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

export function Projects() {
  const slides = useMemo(() => DEFAULT_IMAGES, []);
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const [step, setStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clampIndex = (i) => {
    const n = slides.length;
    return ((i % n) + n) % n;
  };

  const goPrev = () => setIndex((v) => clampIndex(v - 1));
  const goNext = () => setIndex((v) => clampIndex(v + 1));

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      const gap = 24; // must match gap-6
      setStep(w + gap);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const data = [
    { sba: "6,000 Sq.Ft" },
    { sba: "8,000 Sq.Ft" },
    { sba: "10,000 Sq.Ft" },
  ];

  return (
    <div>
      <Header />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerWrap}
        className="h-[400px] px-2 lg:h-[600px] flex flex-col items-center justify-center relative"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/project.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/homepage.webp"
        />

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/35"></div>
        <motion.p
          variants={fadeUp}
          className="relative z-10 text-center text-[#2B2B2B] font-urbanist text-white/75 text-[18px] lg:w-[850px] sm:text-[20px] lg:text-[30px]"
        >
          Introducing
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="relative z-10 text-center text-white font-brushelva text-[30px] lg:text-[100px] lg:w-[1070px] sm:text-[32px] "
        >
          ECOVARA
        </motion.h1>
      </motion.div>
      <div className="h-[1155px] lg:h-[1024px] bg-gradient-to-b from-[#D3FFE5] to-[#FEFFFF]">
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[67px] px-[16px] pt-[51px] lg:px-[100px] lg:pt-[101px]">
          <div>
            <img
              src="/images/ecovara.webp"
              className="w-[358px] h-[334px] lg:w-[563px] lg:h-[540px]"
            />
          </div>
          <div className="lg:w-[610px]">
            <img src="/images/project_icon.svg" />
            <div className="font-brushelva text-[25px] lg:text-[50px] text-[#000000]">
              <span className="text-[#1A614F]">Ecovara</span> by Novara Nature
              Estate
            </div>
            <p className="text-[16px] lg:text-[18px] font-urbanist pt-[14px]">
              Strategic Location, Promising Returns Ecovara by Novara Nature
              Estate is strategically situated near prominent IT hubs and
              industrial corridors – blending the tranquility of countryside
              living with the convenience of urban access.
            </p>
            <p className="text-[16px] lg:text-[18px] font-urbanist">
              Inspired By Nature, Perfect For Your Weekend Home.{" "}
              <strong>
                Situated Near The Historic Lepakshi Temple Along
                Bengaluru-Hyderabad National Highway
              </strong>
              , Novara Nature Estate Is A Gated Community Where Free-Spirited
              Design Blends Seamlessly With Modern Living.
            </p>
            <p>
              <strong>Spread Across 15 Acres</strong>, This Serene Retreat
              Offers A Harmonious Mix Of Rustic Charm And Contemporary Comforts.
              Whether You’re Looking For A Peaceful Weekend Escape Or A Larger
              Plot For Farming, Our Flexible Unit Sizes –{" "}
              <strong>Starting From 6,000 Sqft Onwards</strong>, Cater To Your
              Unique Needs.
            </p>
          </div>
        </div>
        <div>
          <div className="relative mx-auto w-[358px] lg:w-[1250px] mt-[36px] overflow-visible">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex items-stretch gap-2 lg:gap-6"
                animate={{ x: step ? -index * step : 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              >
                {slides.map((img, i) => (
                  <motion.div
                    key={`${img.src}-${i}`}
                    ref={i === 0 ? cardRef : null}
                    className={[
                      "relative shrink-0",
                      "w-[140px]",
                      "h-[100px]",
                      "lg:h-full",
                      "sm:w-[640px] md:w-[600px]",
                      "lg:w-[360px] xl:w-[380px] 2xl:w-[400px]",
                    ].join(" ")}
                  >
                    <div className="relative overflow-hidden rounded-[15px] lg:rounded-[34px] bg-transparent">
                      <div className="aspect-[16/9] w-full lg:aspect-[16/10]">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="h-[100px] w-[148px] lg:h-full lg:w-full object-cover"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Buttons outside, visible */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-[-10px] top-1/2 z-10 -translate-y-1/2 lg:left-[-60px] lg:top-1/2 lg:z-10 -lg:translate-y-1/2 rounded-full bg-[#0F6A49] p-[2px] lg:p-2 text-white transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <ChevronLeft className="h-5 w-5 lg:h-8 lg:w-8" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-[-10px] top-1/2 z-10 -translate-y-1/2 lg:right-[-30px] lg:top-1/2 lg:z-10 -lg:translate-y-1/2 rounded-full bg-[#0F6A49] p-[2px] lg:p-2 text-white transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <ChevronRight className="h-5 w-5 lg:h-8 lg:w-8" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="bg-no-repeat bg-cover bg-center flex flex-col lg:flex-row justify-center items-center p-3 lg:p-0 gap-[8px] lg:gap-[20px] lg:h-[577px]"
        style={{ backgroundImage: "url('/images/specification.webp')" }}
      >
        <div className="lg:w-[413px]">
          <img src="/images/updated_icon.svg" alt="sparkle" />
          <div className="font-brushelva text-[#FFD871] text-[28px] lg:text-[38px]">
            Specification of the Ecovara Plot
          </div>
          <p className="text-[14px] lg:text-[16px] font-urbanist text-white">
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary.
          </p>
        </div>

        <div className="bg-white font-urbanist p-[20px] lg:p-[40px] lg:w-[807px] lg:h-[444px] rounded-xl">
          <div>
            <div className="flex flex-col lg:flex-row">
              <div className="">
                <div className="flex items-center gap-[10px]">
                  <img src="/images/spacious.svg" alt="" />
                  <div className="font-semibold text-[20px]">
                    Spacious Plot Dimensions
                  </div>
                </div>
                <p className="lg:w-[329px] pt-2 lg:pt-0 text-[14px] lg:text-[16px] lg:mt-[10px]">
                  Well-designed plot sizes that give you ample space to build,
                  grow, and enjoy open, green surroundings.
                </p>
              </div>
              <div className="w-full lg:hidden my-[14px] h-[1.5px] bg-[#262626]/60"></div>
              <span className="h-[150px] hidden lg:block w-[2px] ms-4 me-4 bg-[#262626]/60"></span>
              <div className="">
                <div className="flex items-center gap-[10px]">
                  <img src="/images/farmland.svg" alt="" />
                  <div className="font-semibold text-[20px]">
                    European-Style Farmland
                  </div>
                </div>
                <p className="lg:w-[329px] pt-2 lg:pt-0 text-[14px] lg:text-[16px] lg:mt-[10px]">
                  Elegant European-style planning that blends scenic charm with
                  modern farmland living.
                </p>
              </div>
            </div>

            <div className="w-full my-[14px] h-[1.5px] bg-[#262626]/60"></div>

            <div className="flex flex-col lg:flex-row">
              <div className="">
                <div className="flex items-center gap-[10px]">
                  <img src="/images/fruit.svg" alt="" />
                  <div className="font-semibold text-[20px]">
                    Fruit-Bearing Plantation
                  </div>
                </div>
                <p className="lg:w-[329px] pt-2 lg:pt-0 text-[14px] lg:text-[16px] lg:mt-[10px]">
                  A rich mix of fruit-bearing trees that enhances greenery,
                  supports sustainability, and adds long-term value.
                </p>
              </div>
              <div className="w-full lg:hidden my-[14px] h-[1.5px] bg-[#262626]/60"></div>
              <span className="h-[150px] hidden lg:block w-[2px] ms-4 me-4 bg-[#262626]/60"></span>
              <div className="">
                <div className="flex items-center gap-[10px]">
                  <img src="/images/organic.svg" alt="" />
                  <div className="font-semibold text-[20px]">
                    Organic Garden Space
                  </div>
                </div>
                <p className="lg:w-[329px] pt-2 lg:pt-0 text-[14px] lg:text-[16px] lg:mt-[10px]">
                  Dedicated areas for organic gardening, encouraging healthy
                  living and a closer connection with nature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          className="w-[390px] lg:w-full lg:h-[1067px] px-[32px] py-[40px] lg:px-[120px] lg:py-[89px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/amenities_bg.webp')" }}
        >
          <div className="text-[#FFD972] text-[28px] lg:text-[50px] font-brushelva">
            Project Highlights
          </div>
          <p className="text-white text-[14px] lg:text-[16px] mt-3 lg:w-[1030px] font-urbanist">
            Selling your property should be a rewarding experience, and at
            Estatein, we make sure it is. Our Property Selling Service is
            designed to maximize the value of your property, ensuring you get
            the best deal possible. Explore the categories below to see how we
            can help you at every step of your selling journey
          </p>

          <div className="flex flex-col lg:flex-row gap-[16px] mt-4">
            {amenitiesCards.map((card) => (
              <div
                key={card.id}
                className="bg-white font-urbanist w-[325px] lg:w-[413.33px] p-[24px] rounded rounded-3 lg:h-[236px] lg:p-[40px]"
              >
                <div className="flex align-items-center">
                  <div>
                    <img src={card.imgSrc} />
                  </div>
                  <div className="ps-3 lg:text-[20px] text-[#1A614F] font-semibold">
                    {card.title}
                  </div>
                </div>
                <div className="mt-[18px] text-[14px] lg:w-[320px] lg:text-[16px]">
                  {card.description}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-[16px] mt-4">
            {amenitiesCarded.map((card) => (
              <div
                key={card.id}
                className="bg-white font-urbanist w-[325px] lg:w-[413.33px] p-[24px] rounded rounded-3 lg:h-[236px] lg:p-[40px]"
              >
                <div className="flex align-items-center">
                  <div>
                    <img src={card.imgSrc} />
                  </div>
                  <div className="ps-3 text-[18px] lg:text-[20px] text-[#1A614F] font-semibold">
                    {card.title}
                  </div>
                </div>
                <div className="mt-[18px] text-[14px] lg:w-[320px] lg:text-[16px]">
                  {card.description}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-[16px] mt-[16px]">
            {amenitiesCard.map((card) => (
              <div
                key={card.id}
                className="bg-white font-urbanist lg:w-[413.33px] p-[24px] rounded rounded-3 lg:h-[236px] lg:p-[40px]"
              >
                <div className="flex align-items-center">
                  <div>
                    <img src={card.imgSrc} />
                  </div>
                  <div className="ps-1 text-[18px] lg:text-[20px] text-[#1A614F] font-semibold">
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
              className="bg-no-repeat bg-center bg-cover text-white font-urbanist lg:w-[847px] rounded-3 py-[24px] px-[24px] lg:h-[236px] lg:py-[60px] lg:p-[40px]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                {/* Left side (Title + Description) */}
                <div className="order-1 lg:flex-1 lg:mr-6">
                  <div className="text-[20px] lg:text-[24px] font-bold">
                    Unlock the Value of Your Property Today
                  </div>

                  <div className="mt-[10px] text-[#E2DFDF] lg:text-[16px] lg:max-w-[600px]">
                    Ready to unlock the true value of your property? Explore our
                    Property Selling Service categories and let us help you
                    achieve the best deal possible for your valuable asset.
                  </div>
                </div>

                {/* Button (last on mobile, right on desktop) */}
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
      </div>
      <EcovaraPhotoGallery
        titleTop="Location"
        titleLine1="NEARBY"
        titleLine2="ATTRACTIONS"
        badgeIconSrc="/images/sparkle.svg"
      />

      <div
        className="lg:w-full h-[285px] lg:h-[508px] flex flex-col justify-center items-center "
        style={{ backgroundImage: "url('/images/configure.png')" }}
      >
        <div className="font-brushelva text-[24px] lg:text-[60px] text-white text-center">
          Configurations
        </div>
        <div className="w-[320px] lg:w-[766px] rounded-[16px] border-2 lg:mt-6 mt-3 border-[#FFEAB3]">
          <div className="rounded-2xl overflow-hidden font-urbanist">
            {/* Header */}
            <div className="bg-[#DCA000] grid grid-cols-2 text-white font-semibold text-[18px] lg:text-[20px]">
              <div className="py-[8px] px-2 lg:px-6 lg:py-4  text-center">
                SBA (Sq.Ft)
              </div>
              <div className="py-[8px] px-2 lg:px-6 lg:py-4 text-center">
                Price
              </div>
            </div>

            {/* Rows */}
            {data.map((row, index) => (
              <div
                key={index}
                className="flex flex-row justify-around border-t border-[#FFEAB3]"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "darken",
                }}
              >
                <div className="px-2 py-[8px] lg:px-6 lg:py-[20px] text-white text-center font-medium">
                  {row.sba}
                </div>
                <div className="px-2 py-[8px] lg:py-[20px]  flex items-center justify-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-[#DCA000] font-medium hover:text-[#F4B000] transition-colors"
                  >
                    <img src="/images/lock.svg" />
                    <span>Unlock Price</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <EcovaraInquiryForm />
      <CTAStrip
        title="Move-In Ready Managed Farmland"
        description="Fully developed managed farmlands offering easy ownership, modern infrastructure, and peaceful nature living perfect for weekend stays or long-term investment."
        ctaText="Get Started"
      />
      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
      <Footer />
    </div>
  );
}
