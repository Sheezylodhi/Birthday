"use client";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Surprise() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#FF69B4", "#FFB6C1", "#FFE4E1"],
    });
  };

  return (
    <div className="text-center">
      {!clicked ? (
        <button
          onClick={handleClick}
          className="px-8 py-4 bg-darkpink text-white rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
        >
          Click for Surprise 🎁
        </button>
      ) : (
        <div className="mt-8 text-darkpink text-4xl md:text-5xl animate-pulse font-handwritten">
          Love You Forever 💞
        </div>
      )}
    </div>
  );
}
