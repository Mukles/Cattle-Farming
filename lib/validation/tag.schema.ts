import { z } from "zod";

export const tagSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  createdBy: z.string().min(1),
});
