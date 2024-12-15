import { z } from "zod";

// Base Tag Schema
const baseTagSchema = z.object({
  id: z.number().int().positive({ message: "ID must be a positive integer." }),
  title: z
    .string()
    .min(1, { message: "Title cannot be empty." })
    .max(255, { message: "Title cannot exceed 255 characters." }),
  createdBy: z
    .string()
    .min(1, { message: "CreatedBy must reference a valid user ID." }),
  createdAt: z.date({ message: "CreatedAt must be a valid date." }),
  updateAt: z.date({ message: "UpdateAt must be a valid date." }),
});

export const tagSchema = baseTagSchema;

// Validator for updating a Tag
export const updateTagSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(255, { message: "Title must not exceed 255 characters." }),
  createdBy: z
    .string()
    .min(1, { message: "CreatedBy must reference a valid user ID." }),
  updateAt: z.date({ message: "UpdateAt must be a valid date." }).optional(),
});
