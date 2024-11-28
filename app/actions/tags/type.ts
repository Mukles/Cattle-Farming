import { tagSchema } from "@/lib/validation/tag";
import { z } from "zod";

export type Tag = z.infer<typeof tagSchema>;
