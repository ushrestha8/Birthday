import React from "react";

export default function Countdown({ timeLeft, onSkip }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="text-center p-8 fade-in">
        <div className="text-4xl mb-6">⏰</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          It&apos;s not time yet... you&apos;re not old enough! 😏
        </h1>
        <div className="flex flex-wrap gap-4 justify-center text-center mt-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-lg p-4 shadow-lg min-w-[80px]"
            >
              <div className="text-4xl font-bold text-pink-500">
                {item.value}
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
