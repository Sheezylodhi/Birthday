"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

function OptimizedCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const dots = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(255,182,193,0.05)";
      ctx.fillRect(0, 0, w, h);

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0) dot.x = w;
        if (dot.x > w) dot.x = 0;
        if (dot.y < 0) dot.y = h;
        if (dot.y > h) dot.y = 0;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,105,180,0.3)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function Final() {
  return (
    <div
      key={Date.now()} // <-- This forces a full remount on navigation
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 py-20 bg-pink-50"
    >
      <OptimizedCanvas />

      <div className="z-50 flex flex-col justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-[Dancing Script] text-rose-600"
        >
          Before This Ends…
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.3 }}
          className="max-w-2xl text-center leading-relaxed mt-10"
        >
          <p>Some people don’t just enter your life — they rewrite whole chapters.</p>
          <br />
          <p>They show up quietly, stay without asking, and somehow become the reason the world stops feeling so heavy.</p>
          <br />
          <p>And you, <span className="text-rose-500 font-medium">Meebss</span>, are one of those rare ones.</p>
          <br />
          <p>This little website won’t change the world, but I hope it made your day softer. And if it did, then it already mattered.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 2.4, duration: 1.2 }}
          className="mt-12 italic text-sm text-gray-500"
        >
          Happy Birthday, Misbah.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 3.4, duration: 1.2 }}
          className="mt-2 text-xs text-gray-400 tracking-widest"
        >
          — end of chapter —
        </motion.p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.06 }}
            className="mt-10 px-7 py-2 bg-rose-500 text-white rounded-full shadow-md"
          >
            Replay 🌸
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
