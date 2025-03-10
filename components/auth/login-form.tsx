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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignInFormValues, signInSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInAction } from "@/app/actions/actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [formMessage, setFormMessage] = useState("");
  const [hasMessage, setHasMessage] = useState(false);
  const [status, setStatus] = useState("");
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
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signInAction(formData);
      setFormMessage(result.message);
      setStatus(result.status || "success");
      setHasMessage(true);

      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        router.push(result.redirect);
      }
    } catch (error) {
      console.error(error);
      setFormMessage("Unknown error, please try again later");
      setStatus("error");
      setHasMessage(true);
      toast.error("Unknown error, please try again later");
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Card className="w-full overflow-hidden border border-gray-100 shadow-sm rounded-xl">
      <CardHeader className="px-8 pt-8 pb-4 text-center space-y-1.5">
        <CardTitle className="text-2xl font-semibold tracking-tight">Log in to Plattr</CardTitle>
        <CardDescription className="text-gray-500">
          Welcome back. Please enter your details.
        </CardDescription>
        {hasMessage && (
          <div
            className={`text-sm mt-2 px-3 py-1.5 rounded-md ${
              status === "error" 
                ? "bg-red-50 text-red-600" 
                : "bg-green-50 text-green-600"
            }`}
          >
            {formMessage}
          </div>
        )}
      </CardHeader>

      <CardContent className="px-8 pt-2 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      type="email"
                      className="h-11 bg-gray-50 border-gray-200 focus:border-[#0070C9] focus:ring focus:ring-blue-100 rounded-lg transition-all" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-[#0070C9] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="h-11 bg-gray-50 border-gray-200 focus:border-[#0070C9] focus:ring focus:ring-blue-100 rounded-lg transition-all" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                className="h-4 w-4 rounded border-gray-300 text-[#0070C9] focus:ring-[#0070C9]" 
              />
              <Label 
                htmlFor="remember" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#0070C9] hover:bg-[#005EA3] text-white rounded-lg transition-all font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Continue
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-[#0070C9] hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;