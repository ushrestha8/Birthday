import React, { useRef, useEffect, useState } from "react";
import Lightbox from "./Lightbox"; // Keep this separate for cleanliness

// Load ONLY journey folder photos
const journeyModules = import.meta.glob(
  "/public/journey/*.{jpg,jpeg,png,gif}",
  { eager: true }
);

const journeyPhotos = Object.values(journeyModules).map((m) => m.default);
const loopPhotos = [...journeyPhotos, ...journeyPhotos, ...journeyPhotos];

function getCaption(src) {
  const file = src.split("/").pop() || "";
  return (file.split(".")[0] || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function TimelineReel() {
  const containerRef = useRef(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxCaption, setLightboxCaption] = useState("");

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxCaption(getCaption(src));
    setLightboxOpen(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const total = container.scrollWidth;
    const third = total / 3;
    container.scrollLeft = third;

    let frame;

    const tick = () => {
      if (!container) return;

      container.scrollLeft += 0.00005; // smoother speed


      if (container.scrollLeft >= third * 2) {
        container.scrollLeft = third;
      }

      frame = requestAnimationFrame(tick);
    };

    setTimeout(() => tick(), 300);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (journeyPhotos.length === 0) {
    return (
      <p className="text-center text-gray-600 py-10">
        Add photos into <code>/public/journey/</code> for the memory reel.
      </p>
    );
  }

  return (
    <div className="relative z-10 py-20 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 mt-12">

      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
        Our Journey Together 🎬
      </h2>

      <div className="relative max-w-5xl mx-auto px-4">

        {/* PROJECTOR GLOW */}
        <div className="timeline-projector-glow rounded-3xl p-4 md:p-6 shadow-2xl">

          <div className="relative rounded-2xl py-6 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">

            {/* TOP SPROCKETS */}
            <div className="timeline-sprockets-top" />

            {/* FILM SCROLLER */}
            <div
              ref={containerRef}
              className="hide-scrollbar"
              style={{
                overflowX: "scroll",
                overflowY: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
                WebkitOverflowScrolling: "touch",
                willChange: "transform",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  width: "max-content",
                  willChange: "transform",
                }}
              >
                {loopPhotos.map((src, i) => (
                  <div
                    key={i}
                    className="timeline-frame mx-1 flex flex-col items-center cursor-pointer"
                    onClick={() => openLightbox(src)}
                    style={{
                      transition: "transform 0.25s, filter 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.08)";
                      e.currentTarget.style.filter = "brightness(1.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "brightness(1)";
                    }}
                  >
                    {/* FILM CELL */}
                    <div
  className="timeline-photo"
  style={{
    width: "128px",
    height: "160px",
    background: "white",
    padding: "6px",                 // WHITE BORDER
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.45)", // DEEPER CINEMATIC SHADOW
    animation: "timelineJitter 0.35s infinite alternate",
  }}
>
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#111",
      borderRadius: "6px",
      overflow: "hidden",
    }}
  >
    <img
      src={src}
      alt={getCaption(src)}
      className="w-full h-full object-cover"
      style={{
        animation: "filmFlicker 1.4s infinite ease-in-out",
      }}
    />
  </div>
</div>


                    {/* CAPTION */}
                    <div className="timeline-caption text-xs text-pink-100/90 mt-1 italic">
                      {getCaption(src)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM SPROCKETS */}
            <div className="timeline-sprockets-bottom" />

            {/* PROJECTOR LIGHT BEAM */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 50%, rgba(255,255,200,0.15), transparent 70%)",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-center mt-12 text-2xl text-gray-800 font-semibold">
        Your story rolls on forever ❤️
      </p>
      <p className="text-center mt-4 text-sm text-gray-600">
        Tap any frame to remember the moment →
      </p>

      {/* LIGHTBOX */}
      <Lightbox
        open={lightboxOpen}
        src={lightboxSrc}
        caption={lightboxCaption}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
