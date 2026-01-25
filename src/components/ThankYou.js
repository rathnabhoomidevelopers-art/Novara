import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, PhoneIcon, MailIcon, ArrowLeft, MessageCircleIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ThankYou() {
  const location = useLocation();

  const name = location?.state?.name || "";
  const phone = location?.state?.phone || "";

  useEffect(() => {
    // Nice: keep user at top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FBF3E6]">
      {/* Top brand bar */}
      <div className="w-full bg-[#0F3F3B]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <img
            src="/images/logo.svg"
            alt="SLV Golden Towers"
            className="h-auto w-[180px] sm:w-[240px]"
          />

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-white/15"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main */}
      <motion.main
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[55%_45%] lg:py-16"
      >
        {/* Left content */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-3xl border border-[#FFEEC3] bg-white p-6 shadow-sm sm:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-2xl bg-[#0F3F3B]/10 p-3 text-[#0F3F3B]">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-brushelva text-[#0F3F3B] sm:text-[44px]">
                Thank You!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-700 sm:text-[18px]">
                Your enquiry has been received. Our team will
                connect with you shortly to share pricing, and site
                visit details for <span className="font-bold">Ecovara</span>.
              </p>

              {(name || phone) && (
                <div className="mt-5 rounded-2xl bg-[#FFF7E5] px-4 py-3 text-sm text-slate-700 sm:text-[16px]">
                  <div className="font-semibold text-[#0F3F3B]">
                    Submitted Details
                  </div>
                  <div className="mt-1">
                    {name ? (
                      <div>
                        Name: <span className="font-medium">{name}</span>
                      </div>
                    ) : null}
                    {phone ? (
                      <div>
                        Phone: <span className="font-medium">{phone}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InfoPill title="Response time" value="Within 30–60 mins" />
                <InfoPill title="Location" value="Yelahanka, Bengaluru" />
                <InfoPill title="Working hours" value="Mon–Sun 9:30–6:30" />
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+918660200662"
                  className="inline-flex no-underline items-center justify-center gap-2 rounded-full bg-[#0F3F3B] px-6 py-3 text-sm font-semibold text-[#FFEFC4] hover:bg-[#0a2926]"
                >
                  <PhoneIcon size={18} />
                  Call Now
                </a>

                <a
                  href="mailto:info@novaranatureestate.com"
                  className="inline-flex no-underline items-center justify-center gap-2 rounded-full border border-[#0F3F3B] bg-white px-6 py-3 text-sm font-semibold text-[#0F3F3B] hover:bg-[#0F3F3B]/5"
                >
                  <MailIcon size={18} />
                  Email Us
                </a>

                <Link
                  to="/projects"
                  className="inline-flex no-underline items-center justify-center gap-2 rounded-full bg-[#E0B24A] px-6 py-3 text-sm font-semibold text-[#0F3F3B] hover:brightness-95"
                >
                  Explore Project
                </Link>
              </div>

              <div className="mt-10 rounded-3xl bg-[#FBF3E6] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
                  What happens next?
                </div>

                <ul className="mt-4 space-y-3 text-sm text-slate-700 sm:text-[16px]">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E0B24A]" />
                    We confirm your requirement.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E0B24A]" />
                    We share brochure + latest pricing + offers (if any).
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E0B24A]" />
                    We schedule a private site visit as per your availability.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Right card */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-3xl border border-[#FFEEC3] bg-[#FFF7E5] p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-2xl font-brushelva text-[#0F3F3B] sm:text-[32px]">
            Quick Contacts
          </h2>

          <div className="mt-6 space-y-4">
            <ContactRow
              icon={<PhoneIcon />}
              label="Phone"
              value="+91 8660200662"
              href="tel:+918660200662"
            />
            <ContactRow
              icon={<MailIcon />}
              label="Email"
              value="info@novaranatureestate.com"
              href="mailto:info@novaranatureestate.com"
              breakAll
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-white">
            <img
              src="/images/ecovara_arch.webp"
              alt="Ecovara"
              className="h-[220px] w-full object-cover"
            />
          </div>

          <div className="mt-6 rounded-3xl bg-white p-5">
            <div className="text-sm font-bold uppercase tracking-[0.12em] text-slate-600">
              Address
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700 sm:text-[16px]">
              Novara Nature Estate No. 387, 13th Cross, F-Block,
              <br />
              Sahakar Nagar, Bengaluru, Karnataka 560092
            </p>
          </div>
        </motion.aside>
      </motion.main>

      {/* Footer strip */}
      <div className="w-full bg-[#1F4B48]">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-white/90">
          <p className="text-sm sm:text-[16px]">
            © 2025 novaranatureestates.com. All Rights Reserved.
          </p>
        </div>
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
          <MessageCircleIcon className="w-6 h-6 text-white" />
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
            <MessageCircleIcon className="w-5 h-5 text-white" />
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
          <PhoneIcon className="w-6 h-6 text-white" />
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
            <PhoneIcon className="w-5 h-5 text-white" />
          </span>
        </a>
      </motion.div>
    </div>
  );
}

function InfoPill({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
        {title}
      </div>
      <div className="mt-1 text-sm font-semibold text-[#0F3F3B]">{value}</div>
    </div>
  );
}

function ContactRow({ icon, label, value, href, breakAll }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFEFC4] text-[#0F3F3B]">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-[13px] text-slate-600">{label}</div>
        <div
          className={`text-[14px] font-semibold text-[#0F3F3B] ${
            breakAll ? "break-all" : ""
          }`}
        >
          {value}
        </div>
      </div>
    </a>
  );
}
