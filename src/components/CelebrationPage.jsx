import React, { useEffect, useRef, useState } from "react";
import PhotoGallery from "./PhotoGallery";
import TimelineReel from "./TimelineReel";
import MusicButton from "./MusicButton";


// Load all photos from /public/photos/
const fileModules = import.meta.glob("/public/photos/*.{jpg,jpeg,png,gif,mp4}", {
  eager: true,
});

const allPhotos = Object.values(fileModules).map((m) => m.default);

// Select first 8 images for floating bubbles
const floatingPhotos = allPhotos.slice(0, 8);

export default function CelebrationPage() {
  const audioRef = useRef(null);
  const [balloons, setBalloons] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Balloons
    const balloonColors = [
      "#FF6B9D",
      "#C44569",
      "#FFC048",
      "#66D7D1",
      "#9B59B6",
      "#3498DB",
      "#E74C3C",
      "#F39C12",
    ];
    const b = [];
    for (let i = 0; i < 8; i++) {
      b.push({
        id: i,
        left: 10 + i * 11,
        color: balloonColors[i % balloonColors.length],
        popped: false,
      });
    }
    setBalloons(b);

    // Confetti
    const c = [];
    for (let i = 0; i < 80; i++) {
      c.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 10 + 5,
        color: [
          "#FF6B9D",
          "#C44569",
          "#FFC048",
          "#66D7D1",
          "#9B59B6",
          "#3498DB",
        ][Math.floor(Math.random() * 6)],
      });
    }
    setConfetti(c);

    // Floating hearts
    const h = [];
    for (let i = 0; i < 35; i++) {
      h.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 4,
        size: 18 + Math.random() * 16,
        opacity: 0.4 + Math.random() * 0.5,
      });
    }
    setHearts(h);
  }, []);

  // Autoplay music after any user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const popBalloon = (id) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 overflow-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} loop className="hidden">
        {/* Put song inside public/music/song.mp3 */}
        <source src="/music/song.mp3" type="audio/mp3" />
      </audio>

      <MusicButton audioRef={audioRef}/>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-float select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            top: "-20px",
          }}
        >
          <div
            className="rotate-45"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
            }}
          />
        </div>
      ))}

      {/* Balloons */}
      {balloons.map(
        (balloon) =>
          !balloon.popped && (
            <div
              key={balloon.id}
              className="absolute bottom-0 cursor-pointer animate-balloon-float"
              style={{
                left: `${balloon.left}%`,
                animationDelay: `${balloon.id * 0.2}s`,
              }}
              onClick={() => popBalloon(balloon.id)}
            >
              <div className="relative">
                <div
                  className="w-20 h-24 rounded-full shadow-lg transition-transform hover:scale-110"
                  style={{ backgroundColor: balloon.color }}
                />
                <div
                  className="absolute bottom-0 left-1/2 w-0.5 h-16 bg-gray-400"
                  style={{ transform: "translateX(-50%)" }}
                />
              </div>
            </div>
          )
      )}

      {/* Floating circular photos (automatic) */}
      {floatingPhotos.map((src, i) => (
        <div
          key={i}
          className={`absolute animate-float${i % 2 === 0 ? "" : "-delayed"} z-20`}
          style={{
            top: ["10%", "40%", "60%", "20%", "30%", "70%", "80%", "50%"][i],
            left: ["10%", "80%", "20%", "60%", "40%", "75%", "25%", "50%"][i],
          }}
        >
          <img
            src={src}
            className="w-32 h-32 rounded-full object-cover shadow-lg transition-transform hover:scale-125 hover:rotate-6"
          />
        </div>
      ))}

      {/* Main Birthday Message */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-3xl text-center fade-in">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 animate-pulse">
            Happy 21st Birthday! 🎉
          </h1>

          <p className="text-2xl text-gray-700 leading-relaxed mb-4">
            To the most amazing person in my life,
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Every moment with you is a treasure. Your smile lights up my world,
            your laughter is my favorite sound, and your love is the greatest
            gift I've ever received.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Today isn't just about your birthday — it's about celebrating all of
            the little things that make you magical: your kindness, your
            strength, your softness, and the way you make everything feel like
            home. I'm so grateful to grow with you. 💖
          </p>

          <div className="mt-4 text-xl font-semibold text-pink-500">
            – Your Chiku 🐱
          </div>

          <div className="mt-8 animate-bounce">
            <button
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight + 100,
                  behavior: "smooth",
                })
              }
              className="text-gray-600 text-sm underline underline-offset-4"
            >
              Scroll down to see our journey ↓
            </button>
          </div>
        </div>
      </div>

      {/* Gallery & Timeline */}
      <PhotoGallery />
      <TimelineReel />
    </div>
  );
}
