import { HealthStatus } from "@prisma/client";
import { z } from "zod";

export const animalSchema = z
  .object({
    name: z.string().min(1, "Animal name is required"),
    breed: z.string().min(1, "Breed is required"),
    age: z.coerce
      .number()
      .min(0, "Age must be a positive number")
      .max(30, "Age is too high"),
    weight: z.coerce.number().min(1, "Weight must be a positive number"),
    healthStatus: z.nativeEnum(HealthStatus),
    isPurchased: z.coerce.boolean(),
  })
  .refine(
    (data) => {
      // If isPurchased is false, we don't need to check these fields
      if (!data.isPurchased) return true;

      // If isPurchased is true, all purchase-related fields must be present and valid
      return (
        data.purchaseDate != null &&
        data.purchasePrice != null &&
        data.purchasePrice > 0 &&
        data.seller != null &&
        data.seller.length > 0
      );
    },
    {
      message:
        "Purchase date, price, and seller are required when isPurchased is true",
    }
  )
  .and(
    z.object({
      purchaseDate: z.coerce.date().nullable(),
      purchasePrice: z.coerce
        .number()
        .min(1, "Purchase price must be a positive number")
        .nullable(),
      seller: z
        .string()
        .min(1, "Seller/Market name is required when purchased")
        .nullable(),
    })
  );
