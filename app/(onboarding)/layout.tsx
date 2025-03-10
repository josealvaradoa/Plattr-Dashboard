import Link from "next/link";
import AppLogoIcon from "@/components/app-logo-icon";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCardLayout({
  children,
  showBackLink = true,
}: {
  children: React.ReactNode;
  showBackLink?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Container for the entire auth experience */}
      <div className="w-full max-w-md flex flex-col space-y-4">        
        {/* Logo area - this will be outside the card */}
        <div className="flex justify-center">
          <img src="/images/logo-business.png" alt="Company Logo" className="h-20 mb-2" />
        </div>
        
        {/* Main content area (the auth forms will be rendered here) */}
        {children}
        
        {/* Footer with terms */}
        <p className="text-xs text-center text-gray-500">
          By using Plattr, you agree to our{" "}
          <Link href="/terms" className="text-[#0070C9] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#0070C9] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}