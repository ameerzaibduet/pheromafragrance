"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center px-6 sm:px-10 md:px-10 pt-0 overflow-hidden">

      {/* Background Image: Full width and height */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero2.png"
          alt="Luxury Perfume Background"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Overlay to make text pop against the background */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Left: Content - Now positioned over the background */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex-1 z-10 max-w-md md:max-w-lg pr-4 md:pr-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 md:mb-6"
        >
          Amazing scent <br className="hidden sm:block" /> that reflects{" "}
          <span className="text-white">character</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="text-gray-900/70 text-sm md:text-base max-w-[320px] mb-8 leading-relaxed font-medium"
        >
          Pheroma delivers distinctive fragrances with an elegant, modern touch —
          made for those who stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <button className="bg-black text-white px-6 py-3 rounded-full text-xs md:text-sm font-medium hover:opacity-85 transition shadow-lg">
            Discover collection
          </button>
        </motion.div>
      </motion.div>

      {/* Right: Floating Price Card */}

    </section>
  );
}