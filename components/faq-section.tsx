"use client";

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Plattr free to use?",
    answer: "Yes! Plattr offers a free plan that allows restaurants to list their promotions and attract new customers at no cost. Businesses can upgrade to paid plans for advanced analytics, unlimited customer profiles, and premium promotional tools."
  },
  {
    question: "How does Plattr help restaurants grow?",
    answer: "Plattr connects restaurants with local diners by showcasing their deals and promotions in real-time. Businesses can track customer engagement, optimize promotions based on analytics, and increase foot traffic without expensive advertising."
  },
  {
    question: "Can I switch between pricing plans anytime?",
    answer: "Yes! You can upgrade or downgrade your subscription anytime through your business dashboard. Plan changes take effect immediately, with prorated billing for upgrades and changes applied at the end of your current billing cycle for downgrades."
  },
  {
    question: "Do customers need to pay to access deals?",
    answer: "No. Plattr is completely free for consumers, just like Yelp or Instagram. Customers can browse, save, and redeem deals without any paywalls or subscriptions."
  },
  {
    question: "How do promotions work on Plattr?",
    answer: "Restaurants can create and manage promotions directly from the Plattr dashboard. You can set specific time frames, target customer segments, and customize offer details. Our platform provides tools to help you create effective promotions that drive real business results."
  },
  {
    question: "What insights do I get with Plattr's analytics?",
    answer: "Plattr provides detailed insights into customer engagement, deal performance, peak redemption times, and user demographics. You can track views, saves, and redemptions for each promotion, helping you optimize your marketing strategy based on data rather than guesswork."
  },
  {
    question: "How do I contact customer support?",
    answer: "Businesses on the Free plan can access email support, while Advanced and Premium users get priority chat and phone support. Premium plan members enjoy 24/7 dedicated support with a guaranteed response time of under 1 hour."
  },
  {
    question: "Do you offer a trial for paid plans?",
    answer: "Yes! You can try any of our paid plans for $1 during the first month, with no long-term commitment. This gives you full access to all features of your chosen plan to ensure it's the right fit for your business before committing to the regular subscription price."
  }
];

export function FAQSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Everything you need to know about Plattr for your restaurant.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium py-5 text-gray-900 hover:text-blue-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12 p-6 bg-gray-50 rounded-xl">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <a 
            href="/contact" 
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </div>
  );
}