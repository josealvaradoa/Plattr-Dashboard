"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => console.error("Autoplay prevented:", err));
    }
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background with Glassmorphism Overlay */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-30"
        >
          <source src="/mainVideo.mp4" type="video/mp4" />
        </video>
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-[800px] mx-auto px-6 mt-16"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 text-white">
          Plattr
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl text-white/80 font-light mb-8 max-w-2xl mx-auto">
          Effortless Dining Deals. Maximum Business Growth.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" className="text-lg h-14 px-8 bg-white text-black hover:bg-gray-100 hover:scale-105 transition-transform shadow-lg w-full sm:w-auto rounded-full">
            <Link href="/signup">Learn more</Link>
          </Button>
          <Button asChild size="lg" className="text-lg h-14 px-8 bg-black text-white hover:bg-gray-900 hover:scale-105 transition-transform shadow-lg w-full sm:w-auto rounded-full">
            <Link href="/signup">Start free trial</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}