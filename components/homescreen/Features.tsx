"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Create & Schedule Promotions", image: "/images/promotion.png" },
  { title: "Business Insights & Analytics", image: "/images/insights.png" },
  { title: "Sponsored Deals for Exposure", image: "/images/sponsored.png" },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white text-black text-center">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-semibold mb-12"
        >
          Features Overview
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white p-6 text-black shadow-lg border border-gray-300">
                <CardHeader className="relative h-[300px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </CardHeader>
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}