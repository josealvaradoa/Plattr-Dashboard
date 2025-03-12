"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessOnboardingSchema } from "@/lib/validations/business";
import { toast } from "sonner";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { steps } from "./steps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const BusinessInfoForm = () => {
  const cuisineOptions = ["American", "Chinese", "Italian", "Mexican", "Indian", "Japanese", "French", "Thai", "Greek", "Mediterranean"];
  const featureTags = ["Vegetarian Friendly", "Vegan Options", "Gluten-Free", "Halal", "Kosher", "Outdoor Seating", "Live Music", "Family-Friendly", "Pet-Friendly", "Delivery Available"];
  
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(businessOnboardingSchema),
    defaultValues: {
      name: "",
      description: "",
      priceLevel: "$",
      phone: "",
      email: "",
      address: "",
      cuisineTypes: [],
      tags: [],
      hours: {},
      images: [],
    },
  });

  const handleNext = async () => {
    const fieldsToValidate = {
      0: ["name", "description", "priceLevel"],
      1: ["address"],
      2: ["cuisineTypes", "tags"],
      3: ["hours"],
    } as const;
    
    const currentStepFields = fieldsToValidate[step as keyof typeof fieldsToValidate] || [];
    const isValid = await methods.trigger(currentStepFields);
    console.log("Validation status for step", step, isValid);
    if (isValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const onSubmit = (data: any) => {
    console.log("Form Data Submitted:", data);
    console.log("Selected Cuisines:", data.cuisineTypes);
    console.log("Selected Features:", data.tags);
    toast.success("Business info submitted!");
  };

  // Determine if we're on Step3 to adjust the width
  const isStep3 = step === 2;

  return (
      <Card className={cn(
        "shadow-lg rounded-xl bg-white transition-all duration-300"
      )}>
        <CardHeader className="">
          <CardTitle className="text-2xl text-center">{steps[step]}</CardTitle>
          <Progress value={(step / (steps.length - 1)) * 100} className="mt-4" />
        </CardHeader>
        <CardContent className={cn(
          "transition-all duration-300",
          isStep3 ? "px-6 sm:px-8" : "px-4 sm:px-6"
        )}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && <Step1 />}
              {step === 1 && <Step2 />}
              {step === 2 && <Step3 cuisineOptions={cuisineOptions} featureTags={featureTags} />}
              {step === 3 && <Step4 />}
              <div className="flex justify-between mt-6">
                {step > 0 && (
                  <Button variant="outline" onClick={handleBack} className="w-32">
                    Back
                  </Button>
                )}
                {step === steps.length - 1 ? (
                  <Button type="submit" className="w-32 bg-blue-600 hover:bg-blue-700 text-white">
                    Submit
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="w-32 bg-blue-600 hover:bg-blue-700 text-white">
                    Next
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
  );
};

export default BusinessInfoForm;