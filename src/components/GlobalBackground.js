"use client";
import { useEffect, useRef } from "react";

export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Bright Particles
    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1.5,
      vx: (Math.random() - 0.5) * 0.5,  // faster movement
      vy: (Math.random() - 0.5) * 0.5,
      a: Math.random() * 0.6 + 0.4      // more visible
    }));

    // Twinkling stars
    const twinkles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h / 2,
      r: Math.random() * 1.5 + 1,
      a: Math.random() * 0.7 + 0.5,     // brighter
      speed: Math.random() * 0.05 + 0.03
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,105,180,${p.a})`; // bright hot pink
        ctx.fill();
      }

      // Stars
      for (const t of twinkles) {
        t.a += t.speed;
        if (t.a > 1) t.a = 0.5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${t.a})`; // visible white
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none" />

      {/* Glow circles */}
      <div className="absolute -top-36 -left-36 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-50 animate-pulse -z-20" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl opacity-45 animate-pulse -z-20" />

      {/* Extra sparkle divs */}
      <div className="absolute top-1/4 left-1/3 w-44 h-44 bg-pink-400 rounded-full blur-2xl opacity-35 animate-pulse -z-20" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-rose-400 rounded-full blur-2xl opacity-30 animate-pulse -z-20" />
    </>
  );
}
