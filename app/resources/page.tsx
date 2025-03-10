import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Resources & Insights
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Restaurant Growth Guide",
            description: "Learn proven strategies to grow your restaurant business in today's competitive market.",
            image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=2070&auto=format&fit=crop"
          },
          {
            title: "Digital Marketing Tips",
            description: "Master the art of digital marketing for restaurants with our comprehensive guide.",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2074&auto=format&fit=crop"
          },
          {
            title: "Customer Retention",
            description: "Discover effective techniques to keep customers coming back to your restaurant.",
            image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop"
          }
        ].map((resource, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <Button variant="link" className="p-0" asChild>
              <Link href="#">Read More →</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}