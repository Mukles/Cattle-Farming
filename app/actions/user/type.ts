import { userSchema } from "@/lib/validation/user.schema";
import { z } from "zod";

export type User = Omit<z.infer<typeof userSchema>, "password">;
