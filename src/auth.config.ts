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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // This callbacks allow me insert information user in client
    jwt({ token, user }) {
      // Add user information in token
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Search user in DB
      const user = await prisma.user.findFirst({
        where: { email: token.email! },
      });

      // Search profile in DB
      const profile = await prisma.profile.findFirst({
        where: { userId: user?.id },
      });

      // Add user and profile information in session

      if (!profile) {
        session.user = token.data as any;
        session.user.profile = null;
      } else {
        session.user = token.data as any;

        session.user.profile = {
          ...profile,
          phoneNumber: profile.phoneNumber ?? null,
          timezone: profile.timezone ?? null,
          imageUrl: profile.imageUrl ?? null
        };
      }

      // Extre verification the roles in case of changes on DB
      if (user) session.user.roles = user.roles;

      return session;
    },
  },
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
