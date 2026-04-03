import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BrochureModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitted(true);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="font-brushelva text-2xl text-[#1A614F] mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 font-urbanist">
              Your brochure is on its way. Our team will reach out to you
              shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-[#1A614F] text-white px-6 py-2 rounded-lg hover:bg-[#154f3f] transition font-urbanist"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-brushelva text-2xl lg:text-3xl text-[#1A614F] mb-1">
              Enquire Form
            </h2>
            <p className="text-gray-500 font-urbanist text-sm mb-6">
              Fill in your details and our team will get in touch with you shortly regarding your enquiry.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-urbanist">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A614F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A614F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A614F]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-[#DCA000] hover:bg-[#E3A600] text-white font-semibold py-3 rounded-lg transition"
              >
               Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
