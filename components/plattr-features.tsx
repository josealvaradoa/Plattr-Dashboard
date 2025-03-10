import { BarChart3, Sparkles, Clock, Users, Layers, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-12 h-12 text-blue-600" />,
      title: "Real-Time Promotion Control",
      description: "Launch, update, and pause deals instantly based on customer demand."
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: "Advanced Customer Insights",
      description: "Track engagement, analyze demographics, and optimize promotions with data-driven decisions."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Automated Happy Hours & Special Deals",
      description: "Schedule recurring promotions to drive traffic at key times."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Unlimited Customer Profiles",
      description: "Collect customer data and create personalized experiences to increase retention."
    },
    {
      icon: <Layers className="w-12 h-12 text-blue-600" />,
      title: "Multi-Location Management",
      description: "Manage deals and promotions across multiple business locations effortlessly."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: "Enterprise-Grade Security",
      description: "Protect customer and business data with industry-leading security measures."
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <h2 className="text-4xl font-semibold mb-6">Features That Drive Results</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
        Plattr provides powerful tools to help businesses attract, retain, and grow their customer base with ease.
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center rounded-xl">
            <div className="mb-4 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              {feature.icon}
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-base">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
