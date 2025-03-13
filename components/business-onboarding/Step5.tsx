"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Step5 = () => {
  const { setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const images = watch("images") || [];

  // Initialize preview from form state when component mounts or when returning to this step
  useEffect(() => {
    if (images.length > 0 && images[0] instanceof File) {
      // If we already have an image in the form state, create a preview URL
      setPreview(URL.createObjectURL(images[0]));
    }
  }, [images]);

  // Clean up any object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up previous preview URL if it exists
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      
      // Update the form state with the new file
      setValue("images", [file], { shouldValidate: true });
      
      // Create and set new preview URL
      const newPreviewUrl = URL.createObjectURL(file);
      setPreview(newPreviewUrl);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-xl bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-center">Upload Business Logo or Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Label className="block text-lg font-semibold">Select an Image</Label>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="border p-2 rounded-lg" 
          />
          
          {preview && (
            <div className="flex justify-center mt-4">
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Business Preview" 
                  className="h-44 w-44 object-cover rounded-lg shadow-md" 
                />
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                  onClick={() => {
                    if (preview) {
                      URL.revokeObjectURL(preview);
                    }
                    setPreview(null);
                    setValue("images", [], { shouldValidate: true });
                  }}
                >
                  ×
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5;