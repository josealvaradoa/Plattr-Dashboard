"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Step1 = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Business Name</Label>
        <Input {...register("name")} placeholder="Enter business name" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Input {...register("description")} placeholder="Describe your business" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input 
          {...register("phone", {
            pattern: {
              value: /^[0-9]*$/,
              message: "Please enter numbers only"
            },
            minLength: {
              value: 10,
              message: "Phone number must be 10 digits"
            },
            maxLength: {
              value: 10,
              message: "Phone number must be 10 digits"
            }
          })} 
          placeholder="Enter phone number (10 digits)" 
          type="tel"
          inputMode="numeric"
          onKeyDown={(e) => {
            // Allow: backspace, delete, tab, escape, enter, and navigation keys
            if (
              !/[0-9]/.test(e.key) && 
              e.key !== 'Backspace' && 
              e.key !== 'Delete' && 
              e.key !== 'Tab' && 
              e.key !== 'Escape' && 
              e.key !== 'Enter' && 
              e.key !== 'ArrowLeft' && 
              e.key !== 'ArrowRight' && 
              e.key !== 'ArrowUp' && 
              e.key !== 'ArrowDown'
            ) {
              e.preventDefault();
            }
          }}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label>Email Address</Label>
        <Input {...register("email")} placeholder="Enter business email" type="email" />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}
      </div>

      <div className="space-y-2">
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
        {errors.priceLevel && <p className="text-sm text-red-500">{errors.priceLevel.message as string}</p>}
      </div>
    </div>
  );
};

export default Step1;