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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* Container for the entire auth experience */}
      <div className="w-full max-w-md flex flex-col">
        {/* Back to home link */}
        {showBackLink && (
          <div className="mb-6">
            <Button 
              variant="ghost" 
              asChild 
              className="text-gray-600 hover:text-[#0070C9] transition-colors"
            >
              <Link href="/" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>
        )}
        
        {/* Logo area - this will be outside the card */}
        <div className="mb-4 flex justify-center">
          <Link href="/" aria-label="Go to homepage">
          </Link>
        </div>
        
        {/* Main content area (the auth forms will be rendered here) */}
        {children}
        
        {/* Footer with terms */}
        <p className="mt-8 text-xs text-center text-gray-500">
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