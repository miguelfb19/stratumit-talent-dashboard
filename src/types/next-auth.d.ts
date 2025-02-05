// Here i define the types to user Session acordding to data from DB

import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      birthDate: Date;
      country: string;
      isVerified: boolean;
      imageUrl?: string;
      createdDate: Date;
      roles: string[];
      profile: {
        id: string;
        phoneNumber: string | null;
        timezone: string | null;
        userId: string
        imageUrl: string | null;
      } | null
    } & DefaultSession["user"];
  }
}

