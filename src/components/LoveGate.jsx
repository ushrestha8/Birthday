import React, { useState } from "react";

export default function LoveGate({ onComplete }) {
  const [stage, setStage] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [shouldDodge, setShouldDodge] = useState(false);

  const handleYes = () => {
    setStage(5);
  };

  const handleNo = () => {
    if (stage < 3) {
      setStage((prev) => prev + 1);
    }
  };

  const dodgeNo = () => {
    if (stage >= 3) {
      const newX = Math.random() * (window.innerWidth - 150);
      const newY = Math.random() * (window.innerHeight - 100);
      setNoButtonPos({ x: newX, y: newY });
      setShouldDodge(true);
    }
  };

  // Stage 1
  if (stage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center p-8 fade-in">
          <img
            src="https://i.pinimg.com/736x/47/8e/32/478e32c35de7f6f304f124bc1ef2ea8c.jpg"
            alt="Cute cat"
            className="w-64 h-64 mx-auto mb-6 rounded-lg object-cover shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Do you love me? 😊
          </h1>
          <p className="text-lg text-gray-600 mb-8">Chiku is all yours 💖</p>
          <div className="flex gap-6 justify-center">
            <button
              onClick={handleYes}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all"
            >
              Yes
            </button>
            <button
              onClick={handleNo}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-lg text-xl transition-all"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stage 2
  if (stage === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center p-8 fade-in">
          <img
            src="https://i.pinimg.com/736x/0e/87/87/0e8787c8c2b8b4c8f8e8c8c8c8c8c8c8.jpg"
            alt="Chiku"
            className="w-64 h-64 mx-auto mb-6 rounded-lg object-cover shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Please think again! 🙄
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            If you click no, I will not give you the surprise 😤
          </p>
          <div className="flex gap-6 justify-center">
            <button
              onClick={handleYes}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all"
            >
              Yes
            </button>
            <button
              onClick={() => setStage(3)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-lg text-xl transition-all"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stage 3 & 4 – dodging button
  if (stage === 3 || stage === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
        <div className="text-center p-8 fade-in">
          <img
            src="https://i.pinimg.com/originals/cf/da/09/cfda09c3c8c8c8c8c8c8c8c8c8c8c8c8.gif"
            alt="Chiku crying"
            className="w-64 h-64 mx-auto mb-6 rounded-lg object-cover shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Ek aur baar soch lo! 😫
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            If you click no, I will not give you the surprise 💔
          </p>
          <div className="flex gap-6 justify-center">
            <button
              onClick={handleYes}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all"
            >
              Yes
            </button>
            <button
              onMouseEnter={dodgeNo}
              onClick={dodgeNo}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-lg text-xl transition-all"
              style={
                shouldDodge
                  ? {
                      position: "fixed",
                      left: `${noButtonPos.x}px`,
                      top: `${noButtonPos.y}px`,
                      transition: "all 0.3s ease",
                    }
                  : {}
              }
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stage 5 – final message
  if (stage === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center p-8 fade-in">
          <img
            src="https://i.pinimg.com/originals/8e/3c/3c/8e3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c.gif"
            alt="Cats hugging"
            className="w-96 h-64 mx-auto mb-6 rounded-lg object-cover shadow-lg"
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            I knew it! You love me a lot 😘
          </h1>
          <button
            onClick={onComplete}
            className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return null;
}
