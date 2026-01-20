"use client";
import "./globals.css";
import { useEffect, useRef } from "react";

export default function RootLayout({ children }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      audioRef.current?.play();
      document.removeEventListener("click", handleInteraction);
    };
    document.addEventListener("click", handleInteraction);
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen relative text-gray-700">
        <audio ref={audioRef} loop src="/music.mp3" className="hidden" />

        

        {children}
      </body>
    </html>
  );
}
