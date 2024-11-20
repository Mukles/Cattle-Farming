import { animalSchema } from "@/lib/validation/animale";
import { z } from "zod";

export type Animal = z.infer<typeof animalSchema>;
