"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Step1 = () => {
  const { register, setValue, watch } = useFormContext();
  
  return (
    <div className="space-y-4">
      <Label>Business Name</Label>
      <Input {...register("name")} placeholder="Enter business name" />

      <Label>Description</Label>
      <Input {...register("description")} placeholder="Describe your business" />

      <Label>Price Level</Label>
      <Select
        onValueChange={(value) => setValue("priceLevel", value)}
        defaultValue={watch("priceLevel")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select price level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="$">$ - Inexpensive</SelectItem>
          <SelectItem value="$$">$$ - Moderate</SelectItem>
          <SelectItem value="$$$">$$$ - Expensive</SelectItem>
          <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Step1;