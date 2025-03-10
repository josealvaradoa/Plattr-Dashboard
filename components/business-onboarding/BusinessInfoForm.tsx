"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessOnboardingSchema } from "@/lib/validations/business";
import { toast } from "sonner";
import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
// import Step5 from "./Step5";
// import Step6 from "./Step6";
import { steps } from "./steps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BusinessInfoForm = () => {
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
    const isValid = await methods.trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const onSubmit = (data:any) => toast.success("Business info submitted!");

  return (
    <div className="flex justify-center mt-2">
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-xl bg-white">
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="text-2xl text-center">{steps[step]}</CardTitle>
          <Progress value={(step / (steps.length - 1)) * 100} className="mt-4" />
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && <Step1 />}
              {/* {step === 1 && <Step2 />}
              {step === 2 && <Step3 />}
              {step === 3 && <Step4 />}
              {step === 4 && <Step5 />}
              {step === 5 && <Step6 />} */}

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
    </div>
  );
};

export default BusinessInfoForm;