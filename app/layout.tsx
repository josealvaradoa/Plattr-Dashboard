import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { LayoutRouter } from './layout-router'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Plattr - Local Dining Redefined',
  description: 'Connect with local diners and grow your restaurant business with Plattr',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="light"

      >
          <LayoutRouter>{children}</LayoutRouter>
          <Toaster />
      </ThemeProvider>
      </body>
    </html>
  );
}
