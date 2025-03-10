import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FAQSection } from "@/components/faq-section";
import { FeatureComparisonTable } from "@/components/feature-comparison-table";
import { Check, CheckCircle2 } from "lucide-react";

// Pricing Plan Data
const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for small restaurants just getting started.",
    features: [
      "Basic analytics dashboard",
      "Up to 500 customer profiles",
      "Email support",
      "Basic promotion tools",
      "Standard reporting"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline",
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "$499",
    period: "per month",
    description: "Ideal for growing restaurants ready to scale.",
    features: [
      "Advanced analytics",
      "Unlimited customer profiles",
      "Priority email & chat support",
      "Advanced promotion tools",
      "Custom reporting"
    ],
    buttonText: "Get Started",
    buttonVariant: "default",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "Custom",
    description: "For established restaurants and chains with unique needs.",
    features: [
      "Enterprise analytics",
      "Unlimited everything",
      "24/7 phone & priority support",
      "Custom solutions",
      "API access"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    highlighted: false,
  }
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section - simplified and refined */}
      <section className="relative py-20 px-6 overflow-hidden  bg-gradient-to-b from-red-100 to-blue-100">
        <div className="relative container mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase font-medium tracking-wider text-gray-500 mb-3">
            Plans & Pricing
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
            Simple pricing for growing restaurants
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start free and scale as your business grows. No hidden fees or long-term commitments.
          </p>

          {/* Email signup */}
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3 sm:gap-0">
            <div className="relative flex-grow">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="pr-4 py-6 rounded-full sm:rounded-r-none border border-gray-200 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-100 focus:border-[#0070C9] transition-all"
              />
            </div>
            <Button 
              className="h-12 rounded-full sm:rounded-l-none px-6 font-medium bg-[#0070C9] hover:bg-[#005EA3] transition-all"
            >
              Start Free Trial
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            No credit card required. By entering your email, you agree to receive marketing emails from Plattr.
          </p>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Choose the right plan for your business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Compare our flexible options and find what works for you. All plans include our core platform features.
            </p>
          </div>

          {/* Enhanced Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`overflow-hidden transition-all duration-300 border ${
                  plan.highlighted 
                    ? "border-blue-100 shadow-[0_2px_12px_rgba(0,112,201,0.12)]" 
                    : "border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                } hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 relative`}
              >                
                <CardHeader className={`px-6 pt-6 pb-0 }`}>
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1.5">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-6 pt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-500 ml-2 text-sm">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 mb-6">+ processing fees</p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <div className="h-5 w-5 text-[#0070C9] mr-3 flex-shrink-0">
                          <Check className="h-5 w-5" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="px-6 pt-2 pb-6">
                  <Button 
                    className={`w-full py-6 rounded-full transition-all ${
                      plan.highlighted 
                        ? "bg-[#0070C9] hover:bg-[#005EA3] text-white" 
                        : "bg-white border-[#0070C9] text-[#0070C9] hover:bg-blue-50/50"
                    }`}
                    variant={plan.buttonVariant as "outline" | "default" | "link" | "destructive" | "secondary" | "ghost" | null | undefined}
                    asChild
                  >
                    <Link href={plan.highlighted ? "/signup" : "/contact"}>
                      {plan.buttonText}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-50/70">
        <div className="container mx-auto">
          <FeatureComparisonTable />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* CTA Section - Refined with Apple-inspired design */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-24 text-center rounded-t-3xl">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to grow your restaurant business?</h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            Join thousands of restaurants using Plattr to attract new customers and increase revenue.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="h-12 px-8 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              asChild
            >
              <Link href="/signup">Start for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}