"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Maria's Bistro",
    quote: "Plattr helped increase our foot traffic by 40% in just 3 months!",
    image: "/images/resOne.jpg",
  },
  {
    name: "Downtown Diner",
    quote: "With Plattr, our happy hour deals got 3x more engagement.",
    image: "/images/resTwo.jpg",
  },
  {
    name: "The Coffee Spot",
    quote: "Our business runs smoother with easy-to-use analytics and promotions.",
    image: "/images/resThree.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6"
        >
          Helping 20,000+ Restaurants Get Ahead
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          viewport={{ once: true }}
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
        >
          Restaurants of all sizes use Plattr to attract more customers, run promotions, and grow their business effortlessly.
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6, ease: "easeOut" }} 
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={500}
                  height={300}
                  className="rounded-xl shadow-lg object-cover w-full h-64 md:h-80"
                />
              </motion.div>

              {/* Text */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} 
                viewport={{ once: true }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <h3 className="text-2xl font-bold">{testimonial.name}</h3>
                <p className="text-gray-600 mt-4 text-lg">"{testimonial.quote}"</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}