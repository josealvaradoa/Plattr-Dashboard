"use client";

import { useState } from "react";
import Link from "next/link";

export function SiteFooter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="flex items-center justify-center overflow-hidden py-5 bg-gray-900 text-white text-center">
      <div className="container px-4">
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
          <Link href="/" className="text-white hover:text-gray-400">Home</Link>
          <Link href="/about" className="text-white hover:text-gray-400">About</Link>
              <Link href="/features" className="text-white hover:text-gray-400">Features</Link>
              <Link href="/contact" className="text-white hover:text-gray-400">Contact</Link>
              <Link href="/privacy" className="text-white hover:text-gray-400">Privacy Policy</Link>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Plattr. All rights reserved.</p>
          </div>
        </footer>
      );
    }