import { BirthType, HealthStatus, Status } from "@prisma/client";
import { z } from "zod";

export const animalSchema = z
  .object({
    id: z.number().int().optional(),
    name: z.string().min(1, "Animal name is required"),
    breed: z.string().min(1, "Breed is required"),
    species: z.string().min(1, "Species is required"),
    expectedSalePrice: z.number().nullable().default(null),
    status: z.nativeEnum(Status), // Assuming `Status` is already imported or defined
    age: z.coerce
      .number()
      .min(0, "Age must be a positive number")
      .max(30, "Age is too high"),
    weight: z.coerce.number().min(1, "Weight must be a positive number"),
    teeth: z.coerce.number().default(0),
    latestImage: z.string().nullable().default(null),
    healthStatus: z.nativeEnum(HealthStatus), // Assuming `HealthStatus` is already imported or defined
    comments: z.string().nullable().default(null),

    // Farm-Born Details
    parentId: z.number().nullable().default(null),
    birthType: z.nativeEnum(BirthType).default("SINGLE"), // Assuming `BirthType` is already imported or defined

    // Purchase Details
    isPurchased: z.coerce.boolean(),
    purchaseDate: z.coerce.date().nullable().default(null),
    purchasePrice: z.coerce.number().nullable().default(null),
    seller: z.string().nullable().default(null),
    middleman: z.string().nullable().default(null),
    purchaseImage: z.string().nullable().default(null),

    // Sale Details
    sale: z.string().optional(), // Adjust as needed for the `Sale` model

    // Timestamps
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().default(() => new Date()),
  })
  .superRefine((data, ctx) => {
    // Purchase validation
    if (data.isPurchased) {
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
