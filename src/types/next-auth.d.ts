import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User; // Re-usage the user interface
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    country: string;
    isVerified: boolean;
    createdDate: Date;
    roles: string[];
    permissions: {
      action: string;
      subject: string;
    }[];
    profile: {
      id: string;
      phoneNumber: string | null;
      timezone: string | null;
      imageUrl: string | null;
      profileCompleted: boolean;
    } | null;
  }
}
