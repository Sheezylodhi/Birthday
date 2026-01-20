"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const aiImages = [
  "/ai/teddy-heart.png",
  "/ai/balloons.png",
  "/ai/confetti.png",
  "/ai/gift-box.png",
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-cream-100 py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-[Dancing Script] text-rose-600 text-center"
      >
        Cute & Fun Gallery 🎈
      </motion.h1>

      <div className="mt-12 grid md:grid-cols-2 grid-cols-1 gap-8 place-items-center">
        {aiImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white shadow-xl rounded-xl p-4"
          >
            <img src={src} className="w-64 h-64 object-contain" />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/surprise">
          <motion.button
            whileHover={{ scale: 1.07 }}
            className="px-8 py-3 bg-rose-500 text-white rounded-full shadow-md"
          >
            Open Surprise 🎁
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
