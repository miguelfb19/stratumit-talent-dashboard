import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extiende el tipo User para incluir el campo 'role'
declare module "next-auth" {
  interface User {
    roles: string[]; // O el tipo correspondiente a tu campo role, como enum o string
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
