"use client";
import { motion } from "framer-motion";

export default function LoveLetter({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-pinky p-6 rounded-xl shadow-lg max-w-xl mx-auto text-center font-handwritten text-xl md:text-2xl"
    >
      {text}
    </motion.div>
  );
}
