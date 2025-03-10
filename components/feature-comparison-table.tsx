"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Define features data
const features = [
  { feature: "Pricing", free: "$0", advanced: "$499/mo", premium: "Custom" },
  { feature: "Basic Analytics", free: true, advanced: true, premium: true },
  { feature: "Advanced Analytics", free: false, advanced: true, premium: true },
  { feature: "Enterprise Analytics", free: false, advanced: false, premium: true },
  { feature: "Customer Profiles", free: "Up to 500", advanced: "Unlimited", premium: "Unlimited" },
  { feature: "Email Support", free: true, advanced: true, premium: true },
  { feature: "Chat Support", free: false, advanced: true, premium: true },
  { feature: "24/7 Phone Support", free: false, advanced: false, premium: true },
  { feature: "Custom Promotions", free: false, advanced: true, premium: true },
  { feature: "Featured Placements", free: false, advanced: true, premium: true },
  { feature: "API Access", free: false, advanced: false, premium: true },
  { feature: "Custom Reports", free: false, advanced: true, premium: true },
  { feature: "White Labeling", free: false, advanced: false, premium: true },
];

export function FeatureComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Compare All Features</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See exactly what's included in each plan to find the right fit for your business.
        </p>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="max-w-5xl mx-auto"
      >
        <div className="flex justify-center mb-8">
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full border-gray-300 flex items-center gap-2 px-6 py-5 h-auto"
            >
              {isOpen ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Hide feature comparison
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> View feature comparison
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="overflow-hidden transition-all">
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-1/3 py-4 px-6 text-gray-700">Features</TableHead>
                    <TableHead className="w-1/5 py-4 px-6 text-center text-gray-700">Free</TableHead>
                    <TableHead className="w-1/5 py-4 px-6 text-center text-gray-700">Advanced</TableHead>
                    <TableHead className="w-1/5 py-4 px-6 text-center text-gray-700">Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((item, index) => (
                    <TableRow 
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      <TableCell className="py-4 px-6 font-medium">
                        {item.feature}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-center">
                        {renderValue(item.free)}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-center">
                        {renderValue(item.advanced)}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-center">
                        {renderValue(item.premium)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Helper function to render different types of values
function renderValue(value: boolean | string | undefined) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-blue-600 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-300 mx-auto" />
    );
  } else if (typeof value === "string") {
    return <span>{value}</span>;
  }
  return value;
}