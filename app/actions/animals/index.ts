import { Result, safeAction } from "@/actions/index";
import { animalSchema } from "@/lib/validation/animale";
import { z } from "zod";
import { Animal } from "./type";

export const addAnimalAction = async (
  state: Result<Animal>,
  data: z.infer<typeof animalSchema>
): Promise<Result<Animal>> => {
  return safeAction(async () => {
    const validatedData = animalSchema.parse(data);
    return { success: true, data: validatedData };
  });
};
