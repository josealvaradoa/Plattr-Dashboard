import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
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

    const path = request.nextUrl.pathname;

    // Redirect unauthenticated users away from protected routes
    if (protectedRoutes.some(route => path.startsWith(route)) && !user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Prevent logged-in users from accessing sign-in and sign-up pages
    if (authRoutes.includes(path) && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect logged-in users away from the home page
    if (path === "/" && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch (e) {
    console.error("Auth Middleware Error:", e);
    return NextResponse.next();
  }
};