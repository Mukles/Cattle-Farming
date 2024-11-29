import { animalSchema } from "@/lib/validation/animale.schema";
import { z } from "zod";

export type Animal = z.infer<typeof animalSchema>;
