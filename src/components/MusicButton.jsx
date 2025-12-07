import React, { useEffect, useRef, useState } from "react";

export default function MusicButton({ audioRef }) {
  const [playing, setPlaying] = useState(false);
  const [notes, setNotes] = useState([]);

  // Spawn floating notes when music is playing
  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      const id = Math.random();
      setNotes((prev) => [
        ...prev,
        { id, left: Math.random() * 20, size: 16 + Math.random() * 10 },
      ]);

      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }, 2000);
    }, 600);

    return () => clearInterval(interval);
  }, [playing]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };
  const songName = audioRef?.current?.src
  ? audioRef.current.src.split("/").pop()
  : "Song";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Floating music notes */}
      <div className="relative w-10 h-10">
        {notes.map((n) => (
          <div
            key={n.id}
            className="absolute animate-floating-note text-pink-300"
            style={{
              left: `${n.left}px`,
              bottom: "-5px",
              fontSize: `${n.size}px`,
            }}
          >
            🎵
          </div>
        ))}
      </div>

      {/* Vinyl Button */}
      <button
        onClick={toggleMusic}
        className={`music-btn ${playing ? "spin" : ""}`}
      >
        <div className="record-center" />
      </button>
    </div>
  );
}
