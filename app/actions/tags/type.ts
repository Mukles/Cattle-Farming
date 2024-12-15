import { tagSchema } from "@/lib/validation/tag.schema";
import { z } from "zod";
import { User } from "../user/type";

export type Tag = z.infer<typeof tagSchema> & {
  user?: Partial<User>;
};
