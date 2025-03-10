"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { updateProfileAction, updatePasswordAction } from "@/app/actions/settings";

export { updateProfileAction, updatePasswordAction };

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("fullName")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return {
      status: "error",
      redirect: "/sign-up",
      message: "Email and password are required",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return {
      status: "error",
      redirect: "/sign-up",
      message: error.message,
    };
  }
  
  return {
    status: "success",
    redirect: "/sign-up",
    message:
      "Thanks for signing up! Please check your email for a verification link.",
  };
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate input
  if (!email || !password) {
    return {
      status: "error",
      redirect: "/sign-in",
      message: "Email and password are required",
    };
  }

  const supabase = await createClient();

  // Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Handle error
  if (error) {
    console.error("Sign-in error:", error.message); // Log the error for debugging
    return {
      status: "error",
      redirect: "/sign-in",
      message: error.message,
    };
  }

  return {
    status: "success",
    redirect: "/dashboard",
    message: "Successfully signed in!",
  };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  // Validate input
  if (!email) {
    return {
      status: "error",
      redirect: "/sign-in",
      message: "Email is required",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return {
      status: "error",
      redirect: "/forgot-password",
      message: error.message,
    };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return {
    status: "success",
    redirect: "/forgot-password",
    message: "Check your email for a link to reset your password.",
  };
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return {
        status: "error",
        redirect: "/reset-password",
        message: "Password and confirm password are required",
    }
  }

  if (password !== confirmPassword) {
    return {
        status: "error",
        redirect: "/reset-password",
        message: "Passwords do not match",
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
        status: "error",
        redirect: "/reset-password",
        message: error.message,
    }
  }

  return {
    status: "success",
    redirect: "/dashboard",
    message: "Password updated",
  }
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

/* Sign in method using different providers */

export async function signInWithGitHub() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  // If there's an error, return it. If success, return the URL.
  // No `redirect(...)` call here.
  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
}

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
};

export const signInWithFacebookAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
};


