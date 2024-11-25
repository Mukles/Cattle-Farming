import { ExpenseType } from "@prisma/client";
import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().optional(),
  animalId: z.number().int().optional(),
  type: z.nativeEnum(ExpenseType),
  amount: z.number().min(0, "Amount must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  date: z.date().default(new Date()),
});
