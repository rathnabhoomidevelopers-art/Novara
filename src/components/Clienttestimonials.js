import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sridhar",
    text: "My experience at ECOVARA Farm, located near Lepakshi Temple towards Bangalore North, was truly amazing. What started as a casual discussion with a friend about weekend getaways and investment options turned into a confident decision after visiting the farm.Thank you to the entire Novara Nature Estate team for such a wonderful experience.",
    rating: 5,
  },
  {
    name: "Anitha",
    text: "Novara Nature Estate truly impressed me after I visited their ECOVARA Farm and saw the existing coconut and mango plantations.The quality of the development and the way the farm is maintained convinced me to go ahead and purchase a farm plot.Visiting the site gave me complete clarity, and in my opinion, this location is a strong and promising investment opportunity ,Thank you.",
    rating: 5,
  },
  {
    name: "Rahul",
    text: "We visited ECOVARA Farm again in January, this time as a group of five families.The newly constructed model house and the open farm space kept the children happily engaged with farm activities throughout our stay. Just like our previous visits, the food was prepared according to our preferences.Thanks to the entire Novara Nature Estate team for making our stay memorable.",
    rating: 5,
  },
  {
    name: "Nidhi",
    text: "Thank you so much for visiting us and sharing your wonderful review. We’re delighted to know that you enjoyed the lunch—it truly made our day! Your kind words mean a lot to us and motivate our team to do even better. Please feel free to get in touch with us anytime; we always welcome your suggestions. We look forward to welcoming you again soon.",
    rating: 5,
  },
  {
    name: "Vikas",
    text: "Novara Nature Estate is truly revolutionizing farm ownership. I appreciate their transparent business model and professional approach. I’ve been a customer for over a year now and my experience has been excellent. Highly satisfied—thank you.",
    rating: 5,
  },
  {
    name : "Harish",
    text:"Ecovara Farm offers a serene and well-maintained environment, ideal for those seeking a peaceful retreat amidst nature. Conveniently located near the renowned Lepakshi Temple, the property provides the experience of a spacious, green farm setting.Ecovara Farm is a suitable option for budget-conscious families looking for a calm and nature-oriented experience.",
    rating: 5,
  },
  {
    name : "Nirmala",
    text : "Ecovara Farm itself is a lovely retreat ,peaceful, close to nature, with a fireplace to cozy up by. The cook specializes in North Indian cuisine, and the food was decent and satisfying. The nearest market is about 3–4 km away. Overall, a perfect spot for a relaxing, nature-oriented stay.Thank you, Novara Nature Estate Team.",
    rating: 5,
  }
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
          Real stories from happy investors who trusted us with their farmland journey.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-4 lg:gap-10 lg:mt-14
       w-full max-w-7xl items-center justify-center flex-wrap">
        {visible.map((t, idx) => (
          <div
            key={`${current}-${idx}`}
            className={`bg-white rounded-2xl pt-[20px] h-[280px] lg:h-[300px] pl-[17px] pb-[14px] pr-[10px] lg:pt-[40px] lg:pl-[32px] lg:pr-[28px] lg:pb-[26px] flex flex-col justify-between
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
                style={{ color: "#374151", lineHeight:"2thek 0px" }}
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
              src="/images/clientprev.svg" alt=""
              className="block group-hover:hidden"
            />
            <img
              src="/images/clientprevhover.svg" alt=""
              className="hidden group-hover:block"
            />
          </button>
          <button
            onClick={next}
            className="group w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white active:scale-95"
            aria-label="Next"
          >
            <img
              src="/images/clientnext.svg" alt=""
              className="block group-hover:hidden"
            />
            <img
              src="/images/clientnexthover.svg" alt=""
              className="hidden group-hover:block"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
