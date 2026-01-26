import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BackgroundBeams } from "./ui/background-beams";

const getYouTubeId = (input) => {
  if (!input) return "";

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  const shortsMatch = input.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch?.[1]) return shortsMatch[1];

  const watchMatch = input.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch?.[1]) return watchMatch[1];

  const shortUrlMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortUrlMatch?.[1]) return shortUrlMatch[1];

  return "";
};

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);

    const existing = document.getElementById("yt-iframe-api");
    if (existing) {
      // API script exists but may not be ready yet
      const check = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(check);
          resolve(window.YT);
        }
      }, 50);
      return;
    }

    window.onYouTubeIframeAPIReady = () => resolve(window.YT);

    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
}

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef(null); // YT Player instance
  const iframeIdRef = useRef(""); // current center iframe id (string)

  const videos = useMemo(
    () => [
      { id: 1, youtube: "https://youtu.be/pxDCt7y0aXc", title: "Short 1" },
      { id: 2, youtube: "https://youtu.be/MjY3WfJ0f_s", title: "Short 2" },
      { id: 3, youtube: "https://youtu.be/LD3j4d55xgI", title: "Short 3" },
      { id: 4, youtube: "https://youtu.be/l_6Vpyrfx7Q", title: "Short 4" },
      { id: 5, youtube: "https://youtu.be/3RYUtKbMEHg", title: "Short 5" },
    ],
    [],
  );

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % videos.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

  const getVisibleVideos = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + videos.length) % videos.length;
      visible.push({ ...videos[index], position: i, originalIndex: index });
    }
    return visible;
  };

  // Create/attach YT player ONLY for the center iframe, and advance when it ends
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const YT = await loadYouTubeAPI();
      if (cancelled) return;

      const centerVideo = videos[currentIndex];
      const vid = getYouTubeId(centerVideo.youtube);
      if (!vid) return;

      const iframeId = `yt-center-${vid}-${currentIndex}`; // unique per index
      iframeIdRef.current = iframeId;

      // Wait a tick so the iframe is in DOM
      setTimeout(() => {
        if (cancelled) return;

        // Destroy old player if any (prevents multiple listeners)
        if (playerRef.current?.destroy) {
          try {
            playerRef.current.destroy();
          } catch (e) {}
          playerRef.current = null;
        }

        // Create player on the center iframe
        playerRef.current = new YT.Player(iframeId, {
          events: {
            onReady: (e) => {
              try {
                e.target.mute();
                e.target.playVideo();
              } catch (err) {}
            },
            onStateChange: (e) => {
              // ENDED = 0
              if (e.data === YT.PlayerState.ENDED) {
                nextSlide();
              }
            },
          },
        });
      }, 0);
    };

    init();

    return () => {
      cancelled = true;
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [currentIndex, videos]);

  return (
    <div className="min-h-screen relative bg-teal-700 flex items-center justify-center py-5 lg:py-[90px]">
      <BackgroundBeams className="absolute inset-0 z-10" />

      <div className="relative w-full max-w-7xl">
        <div className="flex flex-col justify-center text-center items-center">
          <div className="text-[28px] lg:text-[50px] font-brushelva text-[#FFD972]">
            Ecovara Farmland Videos
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
          {getVisibleVideos().map((video, idx) => {
            const position = video.position;
            const isCenter = position === 0;

            const vid = getYouTubeId(video.youtube);

            // IMPORTANT:
            // - enablejsapi=1 is required to detect ENDED via YT API
            // - center iframe gets an id so we can attach YT.Player to it
            const iframeId = isCenter ? `yt-center-${vid}-${currentIndex}` : "";

            const src = vid
              ? `https://www.youtube.com/embed/${vid}?playsinline=1&rel=0&modestbranding=1&controls=1&mute=1&autoplay=1&enablejsapi=1&origin=${encodeURIComponent(
                  window.location.origin,
                )}`
              : "";

            return (
              <div
                key={`${video.id}-${idx}`}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${position * 340}px) scale(${
                    isCenter ? 1.2 : position === -1 || position === 1 ? 1 : 0.85
                  })`,
                  zIndex: isCenter ? 30 : 20 - Math.abs(position),
                  opacity: Math.abs(position) > 2 ? 0 : 1,
                }}
              >
                <div className="w-[280px] h-[420px] rounded-3xl overflow-hidden bg-black">
                  {vid ? (
                    <iframe
                      id={iframeId || undefined}
                      className="w-full h-full"
                      src={src}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-sm p-4 text-center">
                      Invalid YouTube link / ID
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-1 top-[350px] -translate-y-1/2 lg:left-4 lg:top-[380px] bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all z-40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 top-[350px] -translate-y-1/2 lg:right-4 lg:top-[380px] bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all z-40"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* indicators */}
        <div className="flex justify-center gap-2 lg:mt-8">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
