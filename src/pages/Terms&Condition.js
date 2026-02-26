// pages/terms-condition/+Page.jsx
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring", stiffness: 80, damping: 18, mass: 0.9 };
const staggerWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: smoothSpring },
};

// ✅ export default function Page() — Vike requires this exact signature
export default function TermsCondition() {
  return (
    <div className="font-poppins">
      <Header />

      {/* Hero */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerWrap}
        className="min-h-[200px] sm:min-h-[266px] flex flex-col items-center justify-center bg-gradient-to-r from-[#baffd7] to-[#fff] px-4"
      >
        <motion.div variants={fadeUp} className="text-center max-w-[900px] font-brushelva leading-snug">
          {/* ✅ Plain h1 inside motion.div — always in SSR HTML */}
          <h1 className="text-[22px] sm:text-[32px] lg:text-[64px]">Terms & Conditions</h1>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerWrap}
        className="px-4 py-10 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-[#111827]">
            <h2 className="font-bold text-[18px] sm:text-[24px]">Introduction</h2>
            <p className="mt-3 text-[14px] sm:text-[18px] leading-relaxed text-[#374151]">
              By accessing and using this website, you agree to comply with and be bound by these
              Terms & Conditions. If you do not agree, please refrain from using the website.
            </p>
            <p className="mt-3 text-[14px] sm:text-[18px] leading-relaxed text-[#374151]">
              This website is operated for the purpose of providing information related to farmland /
              plotted development projects, including project features, location details, amenities,
              pricing indications, and contact facilitation.
            </p>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">Project Information Disclaimer</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] sm:text-[16px] text-[#374151]">
              <li>
                All information, images, videos, layouts, specifications, and visuals displayed on this
                website are <strong>indicative in nature</strong> and for{" "}
                <strong>informational purposes only.</strong>
              </li>
              <li>
                The developer reserves the right to{" "}
                <strong>modify, alter, or amend</strong>&nbsp; project details, specifications, layouts,
                and pricing without prior notice, subject to statutory approvals.
              </li>
              <li>
                Actual development may vary due to site conditions, approvals, or technical reasons
              </li>
            </ul>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">No Legal or Investment Advice</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] sm:text-[16px] text-[#374151]">
              <li>
                The content on this website does{" "}
                <strong>not constitute legal, financial, or investment advice.</strong>
              </li>
              <li>
                Prospective buyers are advised to conduct{" "}
                <strong>independent due diligence,</strong> including verification of land titles,
                approvals, zoning, and local regulations before making any purchase decision.
              </li>
            </ul>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">Pricing & Availability</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] sm:text-[16px] text-[#374151]">
              <li>Prices mentioned (if any) are indicative and subject to change without notice.</li>
              <li>Availability of plots/farmland is subject to confirmation at the time of booking.</li>
              <li>
                Booking is confirmed only upon receipt of the prescribed amount and execution of
                relevant agreements.
              </li>
            </ul>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">Site Visits & Amenities</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] sm:text-[16px] text-[#374151]">
              <li>
                Site visits are provided for convenience and do not guarantee availability or final
                allotment.
              </li>
              <li>
                Amenities mentioned are proposed and may be delivered in phases as per the project plan.
              </li>
            </ul>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">Intellectual Property</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] sm:text-[16px] text-[#374151]">
              <li>
                All content on this website, including text, images, videos, logos, designs, and
                layouts, is the intellectual property of the developer/brand.
              </li>
              <li>Unauthorized copying, reproduction, or use of content is strictly prohibited.</li>
            </ul>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">Limitation of Liability</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-[14px] sm:text-[16px] text-[#374151]">
              <li>
                The developer shall not be liable for any direct or indirect loss arising from reliance
                on the information provided on this website
              </li>
              <li>
                The website may contain links to third-party platforms; the developer is not responsible
                for their content or practices.
              </li>
            </ul>

            <h2 className="mt-8 font-bold text-[18px] sm:text-[24px]">Governing Law</h2>
            <p className="mt-3 text-[14px] sm:text-[18px] leading-relaxed text-[#374151]">
              These Terms & Conditions shall be governed by and interpreted in accordance with the laws
              of <strong>India</strong>, and any disputes shall be subject to the jurisdiction of the
              competent courts in the respective state.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating WhatsApp + Call */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9 }}
        className="fixed bottom-16 lg:bottom-5 right-9 lg:right-4 z-[9999] flex flex-col items-end gap-4 font-poppins"
      >
        <a href="https://wa.me/918660200662" target="_blank" rel="noopener noreferrer"
          className="whatsapp-chat sm:hidden w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <img src="/images/whatsapp.svg" alt="whatsapp" className="w-7 h-7 text-white" />
        </a>
        <a href="https://wa.me/918660200662" target="_blank" rel="noopener noreferrer"
          className="whatsapp-chat-gtm hidden sm:inline-flex group no-underline relative items-center bg-white pl-3 pr-[70px] py-3 rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] hover:scale-[1.02] transition-transform">
          <span className="text-slate-800 group-hover:text-green-600 font-semibold text-base whitespace-nowrap transition-colors">WhatsApp</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <img src="/images/whatsapp.svg" alt="whatsapp" className="w-7 h-7 text-white" />
          </span>
        </a>
        <a href="tel:+918660200662"
          className="tel-chat sm:hidden w-12 h-12 rounded-xl bg-[#3B46F6] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <img src="/images/call_ico.svg" alt="call" className="w-7 h-7 text-white" />
        </a>
        <a href="tel:+918660200662"
          className="tel-chat-gtm hidden sm:inline-flex group no-underline relative items-center bg-white pl-3 pr-[66px] py-3 rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] hover:scale-[1.02] transition-transform">
          <span className="text-slate-800 group-hover:text-[#3B46F6] font-semibold text-base whitespace-nowrap transition-colors">+91 8660200662</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#3B46F6] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <img src="/images/call_ico.svg" alt="call" className="w-7 h-7 text-white" />
          </span>
        </a>
      </motion.div>

      <Chatbot />
      <Footer />
    </div>
  );
}
