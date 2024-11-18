import { z } from "zod";

export const animalSchema = z.object({
  name: z.string().min(1, "Animal name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z
    .number()
    .min(0, "Age must be a positive number")
    .max(30, "Age is too high"),
  weight: z.number().min(1, "Weight must be a positive number"),
  healthStatus: z.enum(["Healthy", "Sick", "Under Treatment"]),
  isPurchased: z.boolean(),
  purchaseDate: z.string().optional(),
  purchasePrice: z
    .number()
    .min(1, "Purchase price must be a positive number")
    .optional(),
  seller: z
    .string()
    .min(1, "Seller/Market name is required when purchased")
    .optional(),
});
