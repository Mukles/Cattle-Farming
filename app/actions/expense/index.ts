import { prisma } from "@/lib/prisma";
import { expenseSchema } from "@/lib/validation/expense.schema";
import { Result, safeAction } from "..";
import { Expense } from "./type";

export const addExpenseAction = async (
  state: Result<Expense>,
  formData: FormData
): Promise<Result<Expense>> => {
  return safeAction(async () => {
    const data = Object.fromEntries(formData);
    const validatedData = expenseSchema.parse(data);
    const newExpense = await prisma.expense.create({ data: validatedData });
    return { success: true, data: newExpense };
  });
};
