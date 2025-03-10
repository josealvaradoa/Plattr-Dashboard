"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const pricingOptions = [
  {
    name: "Starter",
    description: "For small businesses getting started.",
    price: "$0",
    link: "/pricing",
  },
  {
    name: "Growth",
    description: "For growing restaurants and multi-locations.",
    price: "$49/mo",
    link: "/pricing",
  },
];

export default function Pricing() {
  return (
    <section className="bg-gradient-to-r from-black to-gray-900 text-white py-24 text-center rounded-t-3xl ">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold mb-6"
      >
        Flexible Pricing for Every Business
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {pricingOptions.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-lg p-8 text-white shadow-xl border-none transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                <p className="text-3xl font-bold mt-4">{plan.price}</p>
              </CardHeader>
              <Button asChild className="mt-6 w-full bg-white text-black rounded-full hover:bg-gray-200 transition-all">
                <Link href={plan.link}>Get Started</Link>
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}