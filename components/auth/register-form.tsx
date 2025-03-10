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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpAction } from "@/app/actions/actions";
import { toast } from "sonner";
import { useState } from "react";

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
    <Card className="w-full overflow-hidden border border-gray-100 shadow-sm rounded-xl">
      <CardHeader className="px-8 pt-8 pb-4 text-center space-y-1.5">
        <CardTitle className="text-2xl font-semibold tracking-tight">Create your account</CardTitle>
        <CardDescription className="text-gray-500">
          Join Plattr to connect with local dining deals
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
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
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a secure password"
                      className="h-11 bg-gray-50 border-gray-200 focus:border-[#0070C9] focus:ring focus:ring-blue-100 rounded-lg transition-all" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-[#0070C9] hover:bg-[#005EA3] text-white rounded-lg transition-all font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Create Account
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#0070C9] hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;