import { expenseSchema } from "@/lib/validation/expense";
import { z } from "zod";

export type Expense = z.infer<typeof expenseSchema>;
