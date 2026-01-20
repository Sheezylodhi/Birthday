"use client";
import { useEffect } from "react";

export default function HeartAnimation() {
  useEffect(() => {
    const container = document.createElement("div");
    container.className = "absolute top-0 left-0 w-full h-full pointer-events-none";
    document.body.appendChild(container);

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.className =
        "absolute text-2xl md:text-4xl animate-float";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.animationDuration = 3 + Math.random() * 2 + "s";
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };

    const interval = setInterval(createHeart, 300);
    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, []);

  return null;
}
