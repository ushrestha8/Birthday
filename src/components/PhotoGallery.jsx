import React from "react";

// Load all files from /public/photos/
const fileModules = import.meta.glob(
  "/public/photos/*.{jpg,jpeg,png,gif,mp4}",
  { eager: true }
);

const files = Object.values(fileModules).map((mod) => mod.default);

export default function PhotoGallery() {
  if (files.length === 0) {
    return (
      <p className="text-center text-gray-600 py-10">
        No media found. Add images/videos to <code>/public/photos/</code>
      </p>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Memories ❤️
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">

        {files.map((src, index) => {
          const isVideo = src.endsWith(".mp4");

          return (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg">
              
              {isVideo ? (
                <video
                  src={src}
                  controls
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img
                  src={src}
                  alt={`Memory ${index}`}
                  className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
                />
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}
