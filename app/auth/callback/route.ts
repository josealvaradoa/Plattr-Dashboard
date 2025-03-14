import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Fetch user details
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check if the user has completed business onboarding
      const { data: business, error } = await supabase
        .from("business_approvals")
        .select("status")
        .eq("user_id", user.id)
        .single();

      if (!business || business.status === "pending_info") {
        return NextResponse.redirect(`${origin}/business-info`);
      }

      if (business.status === "pending_approval") {
        return NextResponse.redirect(`${origin}/pending-approval`);
      }

      if (business.status === "rejected") {
        return NextResponse.redirect(`${origin}/rejected`);
      }
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}