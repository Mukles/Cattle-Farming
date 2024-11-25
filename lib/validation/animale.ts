import { HealthStatus } from "@prisma/client";
import { z } from "zod";

export const animalSchema = z
  .object({
    name: z.string().min(1, "Animal name is required"),
    age: z.coerce
      .number()
      .min(0, "Age must be a positive number")
      .max(30, "Age is too high"),
    breed: z.string().min(1, "Breed is required"),
    isPurchased: z.coerce.boolean(),
    purchaseDate: z.coerce.date().nullable().default(null),
    purchasePrice: z.coerce.number().nullable().default(null),
    seller: z.string().nullable().default(null),
    weight: z.coerce.number().min(1, "Weight must be a positive number"),
    healthStatus: z.nativeEnum(HealthStatus),
  })
  .superRefine((data, ctx) => {
    if (data.isPurchased) {
      // When `isPurchased` is true, purchase-related fields must be present and valid
      if (!data.purchaseDate) {
        ctx.addIssue({
          code: "custom",
          path: ["purchaseDate"],
          message: "Purchase date is required.",
        });
      }
      if (!data.purchasePrice || data.purchasePrice <= 0) {
        ctx.addIssue({
          code: "custom",
          path: ["purchasePrice"],
          message: "Purchase price must be a positive number.",
        });
      }
      if (!data.seller || data.seller.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["seller"],
          message: "Seller/Market name is required.",
        });
      }
    } else {
      // When `isPurchased` is false, purchase-related fields must be null
      if (data.purchaseDate !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["purchaseDate"],
          message: "This field must be null when not purchased.",
        });
      }
      if (data.purchasePrice !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["purchasePrice"],
          message: "This field must be null when not purchased.",
        });
      }
      if (data.seller !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["seller"],
          message: "This field must be null when not purchased.",
        });
      }
    }
  });
