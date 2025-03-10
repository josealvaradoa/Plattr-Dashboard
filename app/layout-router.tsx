// app/layout-router.tsx
'use client';

import { SiteHeader } from "@/components/site-header";
import { usePathname } from 'next/navigation';

export function LayoutRouter({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up') || pathname?.startsWith('/business-info');

  return (
    <>
      {!isDashboardRoute && <SiteHeader />}
      {children}
    </>
  );
}