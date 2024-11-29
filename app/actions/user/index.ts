"use server";
import "server-only";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/validation/user.schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { Result, safeAction } from "..";
import { User } from "./type";

export const loginUser = async (state: Result<User>, formData: FormData) => {
  return safeAction(async () => {
    const data = Object.fromEntries(formData);
    const validatedData = userSchema.parse(data);

    try {
      return await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirectTo: "/",
      });
    } catch (err) {
      if (isRedirectError(err)) {
        redirect("/");
      }
    }
  });
};

export const verifyUserWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Result<User>> => {
  return safeAction(async () => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return { success: true, data: user };
  });
};
