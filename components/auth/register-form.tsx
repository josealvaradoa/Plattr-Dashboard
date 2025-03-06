"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignUpFormValues, signUpSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpAction } from "@/app/actions/actions";
import { toast } from "sonner";
import { useState } from "react";
import GoogleSignInButton from "@/components/auth/google-sign-in-button";
import { GitHubSignInButton } from "@/components/auth/github-sign-in-button";
import FacebookSignInButton from "@/components/auth/facebook-sign-in-button";

const RegisterForm = () => {
  const [formMessage, setFormMessage] = useState("");
  const [hasMessage, setHasMessage] = useState(false);
  const [status, setStatus] = useState("");

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      // Handle sign in logic here
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("fullName", data.fullName);

      const result = await signUpAction(formData);
      setFormMessage(result.message);
      setStatus(result.status);
      setHasMessage(true);

      if (result.status === "error") {
        toast.error(result.message);
      }

      if (result.status === "success") {
        toast.success(result.message);
      }
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(formMessage || "Unknown error, please try again later");
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <Card className="rounded-xl gap-y-2">
      <CardHeader className="px-10 pt-8 pb-0 text-center">
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
        <div
          className={`text-sm text-center ${
            status === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {hasMessage && formMessage}
        </div>
      </CardHeader>
      <CardContent className="px-10 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="mt-4 w-full"
                tabIndex={4}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
                Log in
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
              You have an account?{" "}
              <Link href={"/sign-in"} tabIndex={5}>
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter className="flex flex-col gap-y-4">
        <div className="text-muted-foreground text-center text-sm">
          Or continue with
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <GitHubSignInButton />
          <GoogleSignInButton />
          <FacebookSignInButton />
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default RegisterForm;
