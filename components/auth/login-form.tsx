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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignInFormValues, signInSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInAction } from "@/app/actions/actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitHubSignInButton } from "./github-sign-in-button";
import GoogleSignInButton from "./google-sign-in-button";
import FacebookSignInButton from "./facebook-sign-in-button";

const LoginForm = () => {
  const [formMessage, setFormMessage] = useState("");
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      // Handle sign in logic here
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signInAction(formData);
      console.log(result);
      setFormMessage(result.message);

      toast.success(result.message);
      router.push(result.redirect);
    } catch (error) {
      console.error(error);
      toast.error(formMessage || "Unknown error, please try again later");
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <Card className="rounded-xl gap-y-2">
      <CardHeader className="px-10 pt-8 pb-0 text-center">
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>Sign in and access to your account</CardDescription>
      </CardHeader>
      <CardContent className="px-10 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-6">
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
                        <Link
                          href={"/forgot-password"}
                          className="ml-auto text-sm"
                          tabIndex={5}
                        >
                          Forgot password?
                        </Link>
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

              <div className="flex items-center space-x-3">
                <Checkbox id="remember" name="remember" tabIndex={3} />
                <Label htmlFor="remember">Remember me</Label>
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
              Don&#39;t have an account?{" "}
              <Link href={"/sign-up"} tabIndex={5}>
                Sign up
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

export default LoginForm;
