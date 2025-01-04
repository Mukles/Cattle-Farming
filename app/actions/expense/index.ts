"use server";

import { prisma } from "@/lib/prisma";
import { expenseSchema } from "@/lib/validation/expense.schema";
import "server-only";
import { Result, safeAction } from "..";
import { Expense } from "./type";

export const addExpenseAction = async (
  state: Result<Expense>,
  formData: FormData
): Promise<Result<Expense>> => {
  return safeAction(async () => {
    const data = Object.fromEntries(formData);
    const validatedData = expenseSchema.parse({
      ...data,
      // @ts-ignore
      date: new Date(data.date),
    });
    console.log(validatedData);
    const newExpense = await prisma.expense.create({
      data: {
        amount: validatedData.amount,
        animalId: +validatedData.animalId || undefined,
        date: validatedData.date,
        description: validatedData.description,
        type: validatedData.type !== null ? validatedData.type : 0,
      },
    });

    return { ...newExpense, animalId: newExpense.animalId! };
  });
};
