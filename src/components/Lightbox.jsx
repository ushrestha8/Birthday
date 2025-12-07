import React from "react";

export default function Lightbox({ open, src, caption, onClose }) {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div 
        className="bg-white/10 p-4 rounded-2xl shadow-2xl max-w-3xl lightbox-fade"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          className="rounded-xl max-h-[80vh] mx-auto shadow-lg"
        />

        <p className="text-pink-100 mt-4 text-center text-lg">
          {caption}
        </p>

        <button 
          onClick={onClose}
          className="mt-4 bg-pink-500 px-6 py-2 rounded-xl text-white hover:bg-pink-600 block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}
