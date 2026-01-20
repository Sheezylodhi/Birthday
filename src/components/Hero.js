"use client"; // Hero is a client component

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [hearts, setHearts] = useState([]);
  const [balloons, setBalloons] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const size = Math.random() * 30 + 20;
      const left = Math.random() * 100;
      setHearts((prev) => [...prev, { id, size, left }]);
      setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 5000);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Floating balloons
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const size = Math.random() * 40 + 30;
      const left = Math.random() * 100;
      setBalloons((prev) => [...prev, { id, size, left }]);
      setTimeout(() => setBalloons((prev) => prev.filter((b) => b.id !== id)), 8000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useEffect(() => {
    const target = new Date("2026-01-21T00:00:00+05:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff < 0) {
        clearInterval(interval);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sparkles
  useEffect(() => {
    const temp = Array.from({ length: 30 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setSparkles(temp);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center 
                    bg-gradient-to-b from-pink-200 via-pink-100 to-rose-50 animate-gradient">

      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-500 drop-shadow-lg"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -600, opacity: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
        >❤️</motion.div>
      ))}

      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute text-pink-400"
          style={{ left: `${b.left}%`, fontSize: b.size }}
          initial={{ y: 800, opacity: 0 }}
          animate={{ y: -200, opacity: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >🎈</motion.div>
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="text-5xl md:text-6xl font-[DancingScript] text-rose-600 text-center z-10 drop-shadow-lg"
      >
        Happy Birthday Misbah 🎀
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 text-center mt-4 text-pink-600 font-bold text-lg z-10"
      >
        <div>🎂 {timeLeft.d}d</div>
        <div>⏰ {timeLeft.h}h</div>
        <div>💌 {timeLeft.m}m</div>
        <div>💖 {timeLeft.s}s</div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-4 text-gray-700 max-w-lg text-center z-10"
      >
        Someone so precious deserves something more than just a message 💗
      </motion.p>

      <motion.img
        src="/ai/teddy-heart.png"
        alt="teddy"
        initial={{ scale: 0.7, rotate: -10 }}
        animate={{ scale: 1, rotate: 0, y: [0, -10, 0] }}
        transition={{ type: "spring", stiffness: 120, damping: 8, delay: 1.2, repeat: Infinity }}
        className="w-64 mt-10 drop-shadow-2xl z-10"
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full bg-pink-200 opacity-30 -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      <Link href="/letter">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-12 px-8 py-3 rounded-full bg-rose-500 text-white shadow-lg z-10"
        >
          Open Her Love Letter 💌
        </motion.button>
      </Link>

      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() * 2 }}
        />
      ))}

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
