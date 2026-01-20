"use client";
import confetti from "canvas-confetti";

export default function ConfettiButton({ text }) {
  const handleClick = () => {
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
      colors: ["#FF69B4","#FFB6C1","#FFE4E1"]
    });
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 bg-darkpink text-white rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
    >
      {text}
    </button>
  );
}
