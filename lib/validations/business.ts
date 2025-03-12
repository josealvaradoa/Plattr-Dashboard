import { z } from "zod";

export const businessOnboardingSchema = z.object({
  name: z.string().min(2, "Business name is required").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  priceLevel: z.enum(["$", "$$", "$$$", "$$$$"], {
    message: "Invalid price level",
  }),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  cuisineTypes: z.array(z.string()).min(1, "At least one cuisine type is required"),
  tags: z.array(z.string()).optional(),
  hours: z.record(
    z.string(),
    z.object({
      open: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
      close: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    })
  ),
  images: z.array(z.string().url("Invalid image URL")).optional(),
});