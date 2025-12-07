import React, { useState, useEffect } from "react";
import Countdown from "./components/Countdown";
import LoveGate from "./components/LoveGate";
import CelebrationPage from "./components/CelebrationPage";

const BIRTHDAY_TIME = new Date("2025-12-10T00:00:00-05:00").getTime();

export default function BirthdaySurprise() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Developer secret unlock (CTRL + L)
  useEffect(() => {
  const devSkip = (e) => {
    // CTRL + SHIFT + L
    if (e.key === "L" && e.ctrlKey && e.shiftKey) {
      console.log("🔥 DEV MODE ENABLED (CTRL + SHIFT + L)");
      setTestMode(true);
    }
  };

  window.addEventListener("keydown", devSkip);
  return () => window.removeEventListener("keydown", devSkip);
}, []);


  // Countdown logic
  useEffect(() => {
    const checkTime = () => {
      const now = Date.now();
      const diff = BIRTHDAY_TIME - now;

      if (diff <= 0 || testMode) {
        setIsUnlocked(true);
        setTimeLeft(null);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsUnlocked(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [testMode]);

  // === SCREEN FLOW ===

  // Show countdown until time unlocks
  if (!isUnlocked && timeLeft) {
    return (
      <Countdown
        timeLeft={timeLeft}
        // REMOVE the skip button for girlfriend
        onSkip={() => {}} 
      />
    );
  }

  // After countdown: show love gate (password/phrase stage)
  if (!showCelebration) {
    return <LoveGate onComplete={() => setShowCelebration(true)} />;
  }

  // Final surprise page
  return <CelebrationPage />;
}
