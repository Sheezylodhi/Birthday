"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Romantic Letter Text
const letterText = `
Dear Misbah,

From the moment you came into my life, every day has been brighter, every smile warmer, and every moment more beautiful.

You are the melody to my heart, the light in my world, and the dream I never want to wake up from.

Today, I celebrate you — not just your birthday, but the amazing person you are.

May this day be filled with love, laughter, and every little thing that makes you happiest.

With all my love,
[Your Name]
`;

export default function LetterPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4">
      
      {/* Background same as home page */}
      <Background />

      {/* Arrow hint */}
      {!opened && (
        <motion.div
          className="absolute top-32 animate-bounce z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Image src="/arrow.png" width={200} height={50} alt="Click Arrow" />
        </motion.div>
      )}

      {/* CLOSED SCROLL IMAGE */}
      {!opened && (
    <motion.div
  onClick={() => setOpened(true)}
  className="absolute top-1/4 z-50 flex flex-col items-center cursor-pointer"
>
  {/* Closed Scroll with background merge */}
  <div
    className="w-[600px] h-[320px] rounded-2xl bg-[url('/letterclose.png')] bg-cover bg-center shadow-[0_0_40px_rgba(255,105,180,0.5)]"
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      // Smooth edges with background
      maskImage: "radial-gradient(circle, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
      WebkitMaskImage:
        "radial-gradient(circle, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
    }}
  >
    <h1 className="text-3xl md:text-5xl font-bold text-white text-center pt-28">
    </h1>
  </div>
</motion.div>


      )}

      {/* OPENING ANIMATION */}
    {opened && (
  <motion.div
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative z-50 flex flex-col items-center mt-10"
  >
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[400px] md:w-[400px] h-155 bg-[url('/letteropen.png')] bg-cover bg-center rounded-2xl p-10 pt-14 pb-14 origin-top flex flex-col justify-center items-center text-center"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-[cursive] text-2xl md:text-3xl text-rose-700 mb-4 tracking-wide"
      >
        Dear Meebss,
      </motion.h1>

      {/* Body Text */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="font-serif text-[15px] md:text-[14px] text-yellow-900 leading-6 md:leading-7 whitespace-pre-line"
      >
 Jis pal tum meri zindagi me aayi, har din roshan ho gaya, har muskaan dil ko garam karne lagi, aur har lamha tumhare saath behtareen aur yaadgar ban gaya. Tum meri dhadkan ki dhun ho, meri duniya ka roshan noor ho, aur wo khwab ho jisse main kabhi jagna nahi chahta. Aaj main sirf tumhari birthday nahi mana raha, balki tumhari woh khoobsurat shakhsiyat celebrate kar raha hoon jo meri zindagi me rang bhar deti hai aur har pal ko khaas banati hai. Allah kare aaj ka din mohabbat, hansi aur tumhari sab se pyari khushi se bharpur ho. Hamesha tumhara,
— Tumhara Shohar


      </motion.div>
    </motion.div>

    <Link href="/memories">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,105,180,0.6)" }}
        className="mt-8 px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg z-50"
      >
        Continue 🎀
      </motion.button>
    </Link>
  </motion.div>
)}


      {/* Floating Hearts */}
      {opened && <Hearts />}
    </div>
  );
}

// 🌸 Background (same as Home page)
function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
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
      <div className="fixed -top-36 -left-36 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl opacity-45 animate-pulse" />
      <div className="fixed top-1/4 left-1/3 w-44 h-44 bg-pink-400 rounded-full blur-2xl opacity-35 animate-pulse" />
      <div className="fixed bottom-1/3 right-1/4 w-60 h-60 bg-rose-400 rounded-full blur-2xl opacity-30 animate-pulse" />
    </>
  );
}

// 💖 Floating hearts
function Hearts() {
  const hearts = Array.from({ length: 20 });

  return (
    <>
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-pink-400 rounded-full z-50"
          animate={{
            y: [-10, -800],
            x: [0, Math.random() * 300 - 150],
            scale: [0.5, 1, 0.5],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + Math.random() * 4,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
