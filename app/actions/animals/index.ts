"use server";

import { Result, safeAction } from "@/actions/index";
import { prisma } from "@/lib/prisma";
import { animalSchema } from "@/lib/validation/animale";
import "server-only";
import { Animal } from "./type";

export const addAnimalAction = async (
  state: Result<Animal>,
  formData: FormData
): Promise<Result<Animal>> => {
  return safeAction(async () => {
    const data = Object.fromEntries(formData);
    const validatedData = animalSchema.parse(data);
    const newAnimal = await prisma.animal.create({ data: validatedData });
    return { success: true, data: newAnimal };
  });
};

export const getAnimales = async (): Promise<Result<Animal[]>> => {
  return safeAction(async () => {
    const animals = await prisma.animal.findMany();
    return { success: true, data: animals };
  });
};
