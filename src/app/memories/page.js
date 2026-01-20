"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const cinematicItems = [
  { type: "video", src: "/misbah/v1.mp4" },
  { type: "video", src: "/misbah/v2.mp4" },
  { type: "video", src: "/misbah/v3.mp4" },
  { type: "video", src: "/misbah/v4.mp4" },
  { type: "image", src: "/misbah/5.jpeg" }
];

export default function CinematicGallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cinematicItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative flex justify-center items-center overflow-hidden px-6 py-20">

      <BackgroundAmbient />
      <FloatingHearts />

      <div
        className="relative w-full max-w-4xl h-[500px] rounded-3xl shadow-2xl flex justify-center items-center overflow-hidden z-50"
        style={{
          backgroundImage: "url('/parchment1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <AnimatePresence>
          {cinematicItems[current].type === "video" ? (
            <motion.video
              key={cinematicItems[current].src}
              src={cinematicItems[current].src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-3/4 h-4/5 object-cover rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
            />
          ) : (
            <motion.img
              key={cinematicItems[current].src}
              src={cinematicItems[current].src}
              className="absolute w-3/4 h-4/5 object-cover rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
            />
          )}
        </AnimatePresence>

        <div className="absolute top-6 right-6">
          <Link href="/surprise">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,105,180,0.5)" }}
              className="px-6 py-2 rounded-full bg-rose-500 text-white shadow-lg font-semibold"
            >
              Something For Fou 🎀
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BackgroundAmbient() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const dots = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(255,182,193,0.1)";
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
        ctx.fillStyle = "rgba(255,105,180,0.4)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <>
      <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed -top-36 -left-36 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-50 animate-pulse z-0" />
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl opacity-45 animate-pulse z-0" />
      <div className="fixed top-1/4 left-1/3 w-44 h-44 bg-pink-400 rounded-full blur-2xl opacity-35 animate-pulse z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-60 h-60 bg-rose-400 rounded-full blur-2xl opacity-30 animate-pulse z-0" />
    </>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 15 });

  return (
    <>
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-5 h-5 z-10 text-pink-300"
          style={{ fontSize: "1.2rem" }}
          animate={{
            y: [-50, -900],
            x: [0, Math.random() * 300 - 150],
            opacity: [0, 0.8, 0],
            scale: [0.3, 0.8, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 20 + Math.random() * 10,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          💖
        </motion.div>
      ))}
    </>
  );
}
