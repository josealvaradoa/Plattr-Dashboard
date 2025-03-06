import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight, Check, Database, Settings, Shield, Github, Facebook} from "lucide-react";
import {Card} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SupaNext Starter Kit - Next.js 15 + Supabase Authentication Template",
  description: "A modern, full-featured starter kit combining Next.js 15 with Supabase for authentication and data storage. Complete with social login providers, dashboard, and settings.",
  openGraph: {
    title: "SupaNext Starter Kit - Next.js 15 + Supabase",
    description: "A modern starter kit with Next.js 15, Supabase authentication, and beautiful UI components. Includes social login with Google, GitHub, and Facebook.",
    url: "https://supanext-starter-kit.vicbox.dev",
    siteName: "SupaNext Starter Kit",
    images: [
      {
        url: "/supanext-kit.webp",
        width: 1200,
        height: 630,
        alt: "SupaNext Starter Kit Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupaNext Starter Kit - Next.js 15 + Supabase",
    description: "A modern starter kit with Next.js 15, Supabase authentication, and beautiful UI components.",
    images: ["/supanext-kit.webp"],
  },
  metadataBase: new URL("https://supanext-starter-kit.vicbox.dev"),
};

export default function Home() {
  return (
      <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <div className="relative">
              <div className="absolute inset-0 bg-[url('/pattern-7.svg')] bg-cover opacity-50" />
              <div className="relative z-10">
                  <header className="container mx-auto px-4 py-6">
                      <nav className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                  <Database className="h-4 w-4 text-primary-foreground" />
                              </div>
                              <span className="text-xl font-bold">SupaNextKit</span>
                          </div>
                          <div className="flex items-center gap-4">
                              <Link href="/sign-in">
                                  <Button variant="ghost">Sign In</Button>
                              </Link>
                              <Link href="/sign-up">
                                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                      Get Started
                                  </Button>
                              </Link>
                          </div>
                      </nav>
                  </header>

                  <main className="container mx-auto px-4 py-20">
                      <div className="max-w-3xl mx-auto text-center">
                          <h1 className="text-5xl font-bold mb-6">
                              Jumpstart Your Next Project with{" "}
                              <span className="text-primary">Supabase + Next.js</span>
                          </h1>
                          <p className="text-xl text-muted-foreground mb-8">
                              A complete starter kit with authentication, dashboard, and settings pages.
                              Start building your application in minutes, not days.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Link href="/sign-up">
                                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                                      Get Started
                                      <ArrowRight className="h-4 w-4" />
                                  </Button>
                              </Link>
                              <Link target="_blank" href="https://github.com/vito8916/supanext-starter-kit">
                                  <Button size="lg" variant="outline" className="gap-2">
                                      Source Code
                                      <Github className="h-4 w-4" />
                                  </Button>
                              </Link>
                          </div>
                      </div>
                  </main>
              </div>
          </div>

          {/* Features Section */}
          <section className="py-20 bg-secondary">
              <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                          Everything you need to quickly start building your Next.js application with Supabase
                          backend and authentication.
                      </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3">
                      <Card className="p-6 bg-background/50">
                          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                              <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Authentication</h3>
                          <p className="text-muted-foreground mb-4">
                              Complete authentication system with email/password login and social
                              provider options powered by Supabase Auth.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                              <div className="flex items-center gap-1 text-sm bg-primary/10 px-2 py-1 rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.99c-1.73 1.05-3.5 1.63-5.01 1.63-1.51 0-3.28-.58-5.01-1.63-1.99-1.21-3.38-2.95-3.38-4.99 0-2.04 1.39-3.78 3.38-4.99 1.73-1.05 3.5-1.63 5.01-1.63 1.51 0 3.28.58 5.01 1.63 1.99 1.21 3.38 2.95 3.38 4.99 0 2.04-1.39 3.78-3.38 4.99z" />
                                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                  </svg>
                                  Google
                              </div>
                              <div className="flex items-center gap-1 text-sm bg-primary/10 px-2 py-1 rounded-md">
                                  <Github className="w-4 h-4" />
                                  GitHub
                              </div>
                              <div className="flex items-center gap-1 text-sm bg-primary/10 px-2 py-1 rounded-md">
                                  <Facebook className="w-4 h-4" />
                                  Facebook
                              </div>
                          </div>
                      </Card>

                      <Card className="p-6 bg-background/50">
                          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                              <Database className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Supabase Integration</h3>
                          <p className="text-muted-foreground">
                              Pre-configured Supabase client with database and storage access,
                              ready for your application&apos;s needs.
                          </p>
                      </Card>

                      <Card className="p-6 bg-background/50">
                          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                              <Settings className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">User Dashboard</h3>
                          <p className="text-muted-foreground">
                              Ready-to-use dashboard with profile settings, password management,
                              and appearance customization.
                          </p>
                      </Card>
                  </div>
              </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20">
              <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto">
                      <h2 className="text-3xl font-bold mb-12 text-center">
                          Why Use SupaNextKit?
                      </h2>
                      <div className="space-y-6">
                          {[
                              {
                                  title: "Save Development Time",
                                  description:
                                      "Skip the boilerplate setup and focus on building your unique features",
                              },
                              {
                                  title: "Modern Tech Stack",
                                  description:
                                      "Built with Next.js 15, Supabase, and Tailwind CSS 4 for a powerful development experience",
                              },
                              {
                                  title: "Authentication Ready",
                                  description:
                                      "Complete authentication system with email/password and social providers (Google, GitHub, Facebook)",
                              },
                              {
                                  title: "Responsive UI",
                                  description:
                                      "Beautiful, responsive UI components built with Tailwind CSS 4 and Shadcn UI",
                              },
                          ].map((benefit) => (
                              <div key={benefit.title} className="flex gap-4 items-start">
                                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                      <Check className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                      <h3 className="font-medium mb-1">{benefit.title}</h3>
                                      <p className="text-muted-foreground">
                                          {benefit.description}
                                      </p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-secondary relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/pattern-7.svg')] bg-cover opacity-50" />
              <div className="relative z-10 container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-4">
                      Ready to Build Your Next Project?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Get started with SupaNextKit today and launch your application faster than ever.
                  </p>
                  <Link href="/sign-up">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                          Start Building Now
                          <ArrowRight className="h-4 w-4" />
                      </Button>
                  </Link>
              </div>
          </section>

          {/* Footer */}
          <footer className="py-8 border-t border-border">
              <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                              <Database className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <span className="text-xl font-bold">SupaNextKit</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                          © 2024 SupaNextKit. All rights reserved.
                      </div>
                  </div>
              </div>
          </footer>
      </div>

  );
}
