import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import { isPasswordHashed } from "./utils/isPasswordHashed";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {},
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;
        try {
          // Search email in DB
          const user = await prisma.user.findFirst({
            where: { email },
          });
          if (!user) return null;

          // Check if email is verified with verification token sended to email
          if (user.isVerified === false) return null;

          // Compare passwords
          // If password is hashed (because comes from verification token), make the verification with equality operator
          if (isPasswordHashed(password)) {
            if (password !== user.password) return null;
          } else {
            // If password isn't hashed ('cause comes from login form), make the comparison with bcryptjs
            if (!bcryptjs.compareSync(password, user.password)) return null;
          }

          // Return user with necesary information
          const { password: _, ...rest } = user;
          return rest;
        } catch {
          // console.error(error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
