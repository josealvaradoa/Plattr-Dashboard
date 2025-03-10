"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const testimonials = [
    {
      name: "Michael R.",
      business: "The Urban Diner",
      quote: "Plattr helped us increase our happy hour traffic by 40%! The real-time promotion control is a game-changer.",
      image: "/images/resOne.jpg"
    },
    {
      name: "Samantha K.",
      business: "Cozy Bean Café",
      quote: "We've seen a 30% boost in repeat customers thanks to Plattr's customer insights. It's an essential tool for us now.",
      image: "/images/resTwo.jpg"
    },
    {
      name: "Daniel T.",
      business: "Blue Wave Bar & Grill",
      quote: "Our promotions are now more effective than ever. Plattr's analytics helped us optimize our deals for maximum impact.",
      image: "/images/resThree.jpg"
    },
    {
      name: "Emily J.",
      business: "Sunset Bistro",
      quote: "Plattr's automated deals made our weekday promotions 25% more successful!",
      image: "/images/resOne.jpg"
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Restaurants Love Plattr</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto mb-20">
          <Carousel 
            className="w-full"
            plugins={[autoplayRef.current]}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/1">
                  <Card className="border-none bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col rounded-2xl overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="relative w-full md:w-32 h-32 flex-shrink-0 mx-auto md:mx-0">
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-100">
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            fill 
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-lg md:text-xl leading-relaxed mb-4 italic text-gray-700">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-auto">
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-primary text-sm">{testimonial.business}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-primary w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="relative static transform-none h-10 w-10 rounded-full border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50" />
              <CarouselNext className="relative static transform-none h-10 w-10 rounded-full border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50" />
            </div>
          </Carousel>
        </div>

        {/* Success Stories Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">Success Stories</h3>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <h4 className="text-xl font-semibold mb-3">{testimonial.name}</h4>
                <p className="text-gray-600 mb-6 flex-1">{testimonial.quote}</p>
                <Link 
                  href="#" 
                  className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300 mt-auto group w-fit"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}