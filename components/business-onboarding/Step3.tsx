"use client";

import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Search, Info } from "lucide-react";
import { 
  Card, 
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Step3Props {
  cuisineOptions: string[];
  featureTags: string[];
}

const Step3 = ({ cuisineOptions, featureTags }: Step3Props) => {
  const { control, watch, setValue } = useFormContext();
  const [cuisineSearch, setCuisineSearch] = useState("");
  const [featureSearch, setFeatureSearch] = useState("");
  
  // Initialize arrays if they don't exist
  useEffect(() => {
    if (!watch("cuisineTypes")) {
      setValue("cuisineTypes", []);
    }
    if (!watch("tags")) {
      setValue("tags", []);
    }
  }, [watch, setValue]);
  
  // Watch for selected values
  const selectedCuisines = watch("cuisineTypes") || [];
  const cuisineCount = selectedCuisines.length;
  const selectedFeatures = watch("tags") || [];
  const featureCount = selectedFeatures.length;
  
  // Filter options based on search
  const filteredCuisines = cuisineOptions.filter(cuisine => 
    cuisine.toLowerCase().includes(cuisineSearch.toLowerCase())
  );
  
  const filteredFeatures = featureTags.filter(tag => 
    tag.toLowerCase().includes(featureSearch.toLowerCase())
  );

  // Handle checkbox toggle
  const handleCuisineToggle = (cuisine: string, checked: boolean) => {
    const updatedCuisines = checked
      ? [...selectedCuisines, cuisine]
      : selectedCuisines.filter((item: string) => item !== cuisine);
    setValue("cuisineTypes", updatedCuisines);
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    const updatedFeatures = checked
      ? [...selectedFeatures, feature]
      : selectedFeatures.filter((item: string) => item !== feature);
    setValue("tags", updatedFeatures);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white">      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {/* Header */}
          <p className="text-gray-500 text-center mt-1">Tell diners what makes your restaurant special</p>

          <div className="p-6 space-y-8">
            {/* Cuisine Types Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium">Cuisine Types</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Select all cuisines that apply to your restaurant</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-gray-500">{cuisineCount} selected</span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cuisines..."
                  className="pl-9 bg-gray-50 border rounded-md"
                  value={cuisineSearch}
                  onChange={(e) => setCuisineSearch(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCuisines.map((cuisine: string) => (
                  <label
                    key={cuisine}
                    className={cn(
                      "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedCuisines.includes(cuisine) ? "bg-gray-50 border-blue-200" : "bg-white"
                    )}
                  >
                    <Checkbox 
                      id={`cuisine-${cuisine}`}
                      checked={selectedCuisines.includes(cuisine)}
                      onCheckedChange={(checked) => handleCuisineToggle(cuisine, checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 flex-shrink-0"
                    />
                    <span className="text-sm">{cuisine}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Restaurant Features Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium">Restaurant Features</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Select all features that your restaurant offers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-gray-500">{featureCount} selected</span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search features..."
                  className="pl-9 bg-gray-50 border rounded-md"
                  value={featureSearch}
                  onChange={(e) => setFeatureSearch(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredFeatures.map((feature: string) => (
                  <label
                    key={feature}
                    className={cn(
                      "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedFeatures.includes(feature) ? "bg-gray-50 border-blue-200" : "bg-white"
                    )}
                  >
                    <Checkbox 
                      id={`feature-${feature}`}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureToggle(feature, checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 flex-shrink-0"
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3;