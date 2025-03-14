import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Get the current user session
  const { data: { user } } = await supabase.auth.getUser();

  const protectedRoutes = ["/dashboard", "/settings"];
  const authRoutes = ["/sign-in", "/sign-up"];
  const onboardingRoute = "/business-info";
  const pendingApprovalRoute = "/pending-approval";
  const rejectedRoute = "/rejected";

  const path = request.nextUrl.pathname;

  // ❌ Block unauthenticated users from protected routes & onboarding
  if ((protectedRoutes.includes(path) || path === onboardingRoute) && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (user) {
    // Fetch onboarding status from business_approvals
    const { data: business, error } = await supabase
      .from("business_approvals")
      .select("status")
      .eq("user_id", user.id)
      .single();

    // If query fails, assume user hasn't onboarded yet
    const businessStatus = business?.status || "pending_info";

    // 🛑 Avoid redirect loops by only redirecting if the current path is incorrect
    if (businessStatus === "pending_info" && path !== onboardingRoute) {
      return NextResponse.redirect(new URL(onboardingRoute, request.url));
    }

    if (businessStatus === "pending_approval" && path !== pendingApprovalRoute) {
      return NextResponse.redirect(new URL(pendingApprovalRoute, request.url));
    }

    if (businessStatus === "rejected" && path !== rejectedRoute) {
      return NextResponse.redirect(new URL(rejectedRoute, request.url));
    }

    if (businessStatus === "approved" && protectedRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // ❌ Prevent logged-in users from accessing sign-in/sign-up pages
    if (authRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
};