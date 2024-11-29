import { expenseSchema } from "@/lib/validation/expense.schema";
import { z } from "zod";

export type Expense = z.infer<typeof expenseSchema>;
