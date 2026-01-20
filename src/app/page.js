"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  const audioRef = useRef(null);
  const fireworksCanvasRef = useRef(null);
  const fireworksRunningRef = useRef(false);

  // TARGET DATE → 21 JANUARY 12:00 AM
  const targetDate = new Date("2026-01-21T00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setIsBirthday(true);
        startMusic();
        startFireworksAndConfetti();
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

  const startMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const startFireworksAndConfetti = () => {
    if (fireworksRunningRef.current) return;
    fireworksRunningRef.current = true;

    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const confetti = [];

    const randomColor = () => {
      const colors = ["#ff4d6d", "#ff85a2", "#ffcbf2", "#ffb6c1", "#ffd700", "#00ffff"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const createFirework = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        targetY: Math.random() * canvas.height * 0.4,
        speed: 3 + Math.random() * 2,
        color: randomColor(),
        sparks: [],
      });
    };

    for (let i = 0; i < 600; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 7 + 3,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((fw, index) => {
        if (fw.y > fw.targetY) {
          fw.y -= fw.speed;
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.fill();
        } else {
          if (!fw.exploded) {
            fw.exploded = true;
            for (let i = 0; i < 30; i++) {
              const angle = (Math.PI * 2 * i) / 30;
              const sp = 2 + Math.random() * 3;
              fw.sparks.push({
                x: fw.x,
                y: fw.y,
                vx: Math.cos(angle) * sp,
                vy: Math.sin(angle) * sp,
                alpha: 1,
                color: fw.color,
              });
            }
          }

          fw.sparks.forEach((s) => {
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= 0.02;
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          });

          if (fw.sparks.every((s) => s.alpha <= 0)) {
            particles.splice(index, 1);
          }
        }
      });

      if (Math.random() < 0.05) createFirework();

      confetti.forEach((c) => {
        c.y += c.speed;
        c.x += Math.sin(c.angle);
        if (c.y > canvas.height) c.y = -10;
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.size, c.size);
      });

      requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-4">
      <Background />

      {!isBirthday && (
        <>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-rose-500 z-50"
          >
            Teddy Loves You
          </motion.h1>

          <div className="mt-10 z-50">
            <Image src="/teddy.png" width={220} height={220} alt="Teddy" className="animate-bounce" />
          </div>

          <div className="flex gap-4 mt-6 z-50">
            {["d", "h", "m", "s"].map((unit, idx) => (
              <div key={idx} className="bg-white rounded-xl px-5 py-3 shadow">
                <span className="text-4xl font-bold text-pink-600">{timeLeft[unit]}</span>
                <div className="text-pink-400 text-sm">
                  {unit === "d" ? "Days" : unit === "h" ? "Hours" : unit === "m" ? "Minutes" : "Seconds"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isBirthday && (
        <>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-1/4 z-50 flex flex-col items-center"
          >
            <div className="w-auto p-8 rounded-lg bg-[url('/parchment1.jpg')] bg-cover bg-center shadow-[0_0_40px_rgba(255,105,180,0.5)]">
              <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-800 font-serif text-center">
                🎀 Happy Birthday Meebss! 🎀
              </h1>
            </div>
            <audio ref={audioRef} src="/music.mp3" loop autoPlay />
          </motion.div>

          <Link href="/letter" className="z-50 relative mt-80">
            <motion.button
              whileHover={{
                scale: 1.15,
                boxShadow: "0 0 40px rgba(255,105,180,0.9), 0 0 80px rgba(255,182,193,0.5)",
                y: -3,
              }}
              whileTap={{ scale: 0.95, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, type: "spring", stiffness: 120 }}
              className="mt-10 px-10 py-4 cursor-pointer rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 text-white font-bold text-lg shadow-lg"
            >
              Continue
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl text-white"
              >
                ⬇
              </motion.span>
            </motion.button>
          </Link>
        </>
      )}

      <canvas ref={fireworksCanvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" />
    </div>
  );
}

function Background() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(150,50,100,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,100,150,0.5)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0" />;
}
