"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const steps = [
  {
    title: "Become a Partner",
    description: "Boost visibility, drive more customers, and track performance with smart analytics.",
    image: "/images/partner.png",
    linkText: "Join Plattr →",
    href: "/partners",
  },
  {
    title: "Seamless Dining Experience",
    description: "Discover the best dining deals near you and enjoy exclusive offers effortlessly.",
    image: "/images/app-experience.png",
    linkText: "Download the app →",
    href: "/app",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50 text-black text-center">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-semibold mb-12"
        >
          How Plattr Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white p-8 text-black shadow-lg border border-gray-200 transition-transform hover:scale-105">
                <CardHeader className="flex flex-col items-center">
                  {/* Image Container */}
                  <div className="relative w-[200px] h-[200px] mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Text Content */}
                  <CardTitle className="text-2xl font-semibold">{step.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-lg max-w-sm mx-auto">
                    {step.description}
                  </CardDescription>
                  {/* CTA Link */}
                  <Link href={step.href} className="text-blue-500 font-medium mt-4 hover:underline">
                    {step.linkText}
                  </Link>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}