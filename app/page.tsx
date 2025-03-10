"use client";

import HeroSection from "@/components/homescreen/HeroSection";
import HowItWorks from "@/components/homescreen/HowItWorks";
import WhyPlattr from "@/components/homescreen/WhyPlattr";
import Testimonials from "@/components/homescreen/Testimonials";
import Features from "@/components/homescreen/Features";
import Pricing from "@/components/homescreen/Pricing";
import { SiteFooter } from "@/components/site-footer";

export default function MainPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <WhyPlattr />
        <Testimonials />
        <Features />
        <Pricing />
        <SiteFooter />
      </main>
    </div>
  );
}