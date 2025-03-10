import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { FeaturesSection } from "@/components/plattr-features";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* 🌟 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-6 py-16 bg-gradient-to-b from-red-100 to-blue-100 rounded-b-3xl">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
          Grow Your Restaurant with Smarter Promotions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Plattr helps food businesses attract customers, boost engagement, and optimize deals with real-time analytics.
        </p>
        <div className="mt-8">
          <Button size="lg" className="rounded-full px-8 py-4 shadow-lg">
            <Link href="/signup">Start for Free</Link>
          </Button>
        </div>
      </section>

      {/* 🍽️ Who We Help Section */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16">Solutions for Every Restaurant</h2>
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {[
            {
              title: "Small Restaurants",
              desc: "Increase foot traffic with targeted promotions.",
              img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
            },
            {
              title: "Cafes & Coffee Shops",
              desc: "Boost morning sales and engage regulars.",
              img: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2070&auto=format&fit=crop"
            }
          ].map((item, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}> 
              <div className="relative w-full h-64 md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
                <Image src={item.img} alt={item.title} fill className="object-cover" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">{item.desc}</p>
                <Button asChild>
                  <Link href="/signup">Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔄 How It Works Section */}
      <section className="py-24 bg-accent text-center rounded-3xl mx-6">
        <h2 className="text-4xl font-semibold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["Sign Up", "Create Promotions", "Track Performance", "Grow Your Business"].map((step, index) => (
            <Card key={index} className="p-6 shadow-md hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{step}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {[
                  "Create an account and set up your business in minutes.",
                  "Launch deals that attract customers at the right time.",
                  "Use analytics to see what works and optimize.",
                  "Increase engagement and revenue effortlessly."
                ][index]}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FeaturesSection />
      <TestimonialsSection />

      {/* 🔥 Call to Action Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-24 text-center rounded-t-3xl ">
        <h2 className="text-4xl font-semibold">Ready to Transform Your Restaurant?</h2>
        <p className="text-lg my-6">Join thousands of restaurants already growing their business with Plattr.</p>
        <Button className="bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg w-full sm:w-auto">
          <Link href="/signup">Start for Free</Link>
        </Button>
      </section>

      <SiteFooter />
    </div>
  );
}
