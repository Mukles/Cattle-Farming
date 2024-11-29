import { tagSchema } from "@/lib/validation/tag.schema";
import { z } from "zod";

export type Tag = z.infer<typeof tagSchema>;
