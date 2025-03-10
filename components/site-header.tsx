"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

// Navigation items defined centrally for consistency
const navigationItems = [
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add scroll listener to create different header styles based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Call handler right away to check initial scroll position
    handleScroll();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-[0_2px_5px_rgba(0,0,0,0.03)] border-b border-gray-200/40" 
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        {/* Logo with subtle hover effect */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group relative py-2" 
          aria-label="Plattr Homepage"
        >
          {/* Logo could be here */}
          <span className="text-lg font-semibold tracking-tight text-black transition-colors group-hover:text-[#0070C9]">
            Plattr
          </span>
          
          {/* Subtle underline animation on hover */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0070C9] transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 flex-grow justify-center">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive 
                    ? "text-[#0070C9]" 
                    : "text-gray-700 hover:text-[#0070C9] hover:bg-blue-50/50"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0070C9] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Login/Signup Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="outline"
            className="px-4 bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-900 hover:to-white hover:scale-105 transition-transform shadow-lg rounded-full"
            asChild
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="text-gray-700 hover:bg-gray-100/60 rounded-full h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            
            <SheetContent
              side="right"
              className="w-full max-w-[320px] p-0 border-l border-gray-200"
            >
              <div className="p-6">
                <SheetHeader className="mb-6 flex items-center justify-between">
                  <SheetTitle className="text-xl font-semibold tracking-tight">Menu</SheetTitle>
                  <SheetClose className="rounded-full p-1.5 hover:bg-gray-100">
                    <X className="h-5 w-5 text-gray-500" />
                  </SheetClose>
                </SheetHeader>
                
                <nav className="flex flex-col gap-1.5">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-2.5 text-base rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-[#0070C9] font-medium"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
                
                <div className="mt-8 space-y-3">
                  <Button
                    className="w-full bg-[#0070C9] text-white rounded-full hover:bg-[#005EA3] transition-all py-5 font-medium"
                    asChild
                  >
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      Sign up free
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-[#0070C9] text-[#0070C9] rounded-full hover:bg-blue-50/50 transition-colors py-5 font-medium"
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="mt-auto p-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Questions? <a href="/contact" className="text-[#0070C9] hover:underline" onClick={() => setIsOpen(false)}>Contact us</a>
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}