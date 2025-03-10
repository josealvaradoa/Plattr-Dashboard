"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, BarChart3, Target, DollarSign } from "lucide-react";

const benefits = [
  { icon: DollarSign, title: "Increase Sales", description: "More visibility, more customers." },
  { icon: BarChart3, title: "Track Performance", description: "Real-time data & insights." },
  { icon: Target, title: "Target Local Customers", description: "Smart promotions for the right audience." },
  { icon: CheckCircle, title: "No Upfront Cost", description: "Free to get started, upgrade anytime." },
];

export default function WhyPlattr() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-100 text-black text-center">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-semibold mb-12"
        >
          Why Plattr?
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white p-6 text-black shadow-lg border border-gray-300">
                <CardHeader className="flex flex-col items-center">
                  <benefit.icon className="h-10 w-10 text-gray-900 mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}