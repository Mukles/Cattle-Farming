import { z } from "zod";
import { safeAction } from "..";

// Zod Schema for User Creation
const UserCreateSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(18, "Must be at least 18"),
});

export async function createUser(userData: z.input<typeof UserCreateSchema>) {
  return safeAction(async () => {
    const validatedData = UserCreateSchema.parse(userData);
    return { success: true, data: validatedData };
  });
}
