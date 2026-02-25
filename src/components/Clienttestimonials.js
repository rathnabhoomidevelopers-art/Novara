import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sridhar",
    text: "Visited Ecovara Farm near Lepakshi; beautiful location, supportive team. Glad to buy a farm plot for family time & passive income.",
    rating: 5,
  },
  {
    name: "Anitha",
    text: "Visited ECOVARA Farm by Novara Nature Estate. Coconut & mango plantations, prime location near Lepakshi make it a smart investment.",
    rating: 5,
  },
  {
    name: "Mansur",
    text: "Visited ECOVARA Farm in January with families. Model house, BBQ, homely food & warm hospitality made it memorable. Thanks team!",
    rating: 5,
  },
  {
    name: "Elena Rowe",
    text: "Novara Nature Estate is transforming farm ownership with transparency and professionalism. My one-year experience has been excellent—highly satisfied. Thank you!",
    rating: 5,
  },
  {
    name: "James Lin",
    text: "Ecovara Farm near Lepakshi offers peaceful, well-planned plots with mango & coconut trees, Andhra food, and easy road access.",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-amber-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export function ClientTestimonials() {
  const [current, setCurrent] = useState(0);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      className=" flex flex-col items-center justify-center px-6 py-10 lg:py-20 bg-gradient-to-b from-[#D3FFE5] to-[#FEFFFF]"
    >
      {/* Heading */}
      <div className="text-center mb-4">
        <h2
          className="text-[28px] lg:text-[48px] font-brushelva uppercase mb-6"
          style={{
            color: "#1A614F",
            letterSpacing: "0.12em",
          }}
        >
          What Our Clients Say
        </h2>
        <p className="text-gray-500 text-[16px] max-w-[644px] mx-auto leading-relaxed">
          Community development is often linked with community work or community
          planning, and may involve stakeholders, foundations.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-4 lg:gap-10 lg:mt-14
       w-full max-w-7xl items-center justify-center flex-wrap">
        {visible.map((t, idx) => (
          <div
            key={`${current}-${idx}`}
            className={`bg-white rounded-2xl pt-[20px] h-[220px] lg:h-[282px] pl-[17px] pb-[14px] pr-[10px] lg:pt-[40px] lg:pl-[32px] lg:pr-[28px] lg:pb-[26px] flex flex-col justify-between
        ${idx !== 1 ? "hidden lg:flex" : "flex"}
      `}
            style={{
              width: "380px",
              boxShadow:
                idx === 1
                  ? "0 20px 60px rgba(0,0,0,0.12)"
                  : "0 4px 20px rgba(0,0,0,0.0)",
            }}
          >
            <div>
              <StarRating count={t.rating} />
              <p
                className="text-sm text-[16px] font-urbanist"
                style={{ color: "#374151", lineHeight: "30px" }}
              >
                {t.text.split(" ").map((word, i) =>
                  [
                    "Yet",
                    "melancholy",
                    "And",
                    "excellence",
                    "terminated",
                  ].includes(word) ? (
                    <strong key={i} className="font-semibold text-gray-800">
                      {word}{" "}
                    </strong>
                  ) : (
                    <span key={i}>{word} </span>
                  ),
                )}
              </p>
            </div>
            <div className=" flex flex-col">
              <span className="font-bold text-sm text-gray-900">{t.name}</span>
              <span className="text-[10px] text-gray-400">{t.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Toggle */}
      <div className="mt-12 flex items-center">
        <div
          className="flex items-center rounded-full p-1.5 gap-2 cursor-pointer"
          style={{ background: "#1a5c44", width: "108px", height: "52px" }}
        >
          <button
            onClick={prev}
            className="group w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white active:scale-95"
            aria-label="Previous"
          >
            <img
              src="/images/clientprev.svg"
              className="block group-hover:hidden"
            />
            <img
              src="/images/clientprevhover.svg"
              className="hidden group-hover:block"
            />
          </button>
          <button
            onClick={next}
            className="group w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white active:scale-95"
            aria-label="Next"
          >
            <img
              src="/images/clientnext.svg"
              className="block group-hover:hidden"
            />
            <img
              src="/images/clientnexthover.svg"
              className="hidden group-hover:block"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
