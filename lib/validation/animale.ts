import { z } from "zod";

export const animalSchema = z.object({
  name: z.string().min(1, "Animal name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.coerce
    .number()
    .min(0, "Age must be a positive number")
    .max(30, "Age is too high"),
  weight: z.coerce.number().min(1, "Weight must be a positive number"),
  healthStatus: z.enum(["Healthy", "Sick", "Under Treatment"]),
  isPurchased: z.coerce.boolean(),
  purchaseDate: z.coerce.date(),
  purchasePrice: z.coerce
    .number()
    .min(1, "Purchase price must be a positive number")
    .optional(),
  seller: z
    .string()
    .min(1, "Seller/Market name is required when purchased")
    .optional(),
});
