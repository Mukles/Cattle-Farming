import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().optional(),
  animalId: z.union([z.number().int(), z.string()]).default(""),
  type: z
    .string()
    .min(1, { message: "Type is required" })
    .refine((value) => !isNaN(Number(value)), {
      message: "Amount must be a valid number",
    })
    .transform((value) => Number(value)),
  amount: z
    .string()
    .min(1, { message: "Amount is required" })
    .refine((value) => !isNaN(Number(value)), {
      message: "Amount must be a valid number",
    })
    .transform((value) => Number(value)),
  description: z.string().default(""),
  date: z.date().default(new Date()),
});
