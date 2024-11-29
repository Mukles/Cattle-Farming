import { verifyUserWithPassword } from "@/actions/user";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const result = await verifyUserWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (result?.success === false) {
            throw new Error("Invalid credentials");
          }
          const user = result?.data!;
          return user as User | null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
