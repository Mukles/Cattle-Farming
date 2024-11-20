"use server";

import { Result, safeAction } from "@/actions/index";
import { prisma } from "@/lib/prisma";
import { animalSchema } from "@/lib/validation/animale";
import "server-only";
import { z } from "zod";
import { Animal } from "./type";

export const addAnimalAction = async (
  state: Result<Animal>,
  data: z.infer<typeof animalSchema>
): Promise<Result<Animal>> => {
  return safeAction(async () => {
    const validatedData = animalSchema.parse(data);
    const newAnimal = await prisma.animal.create({ data: validatedData });
    return { success: true, data: validatedData };
  });
};
