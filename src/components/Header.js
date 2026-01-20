"use client";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="text-center mt-16"
    >
      <h1 className="text-7xl md:text-9xl font-handwritten text-darkpink">
        Happy Birthday 💖
      </h1>
      <p className="mt-4 text-2xl md:text-4xl text-pinky animate-pulse">
        You are my world 🌸
      </p>
    </motion.div>
  );
}
