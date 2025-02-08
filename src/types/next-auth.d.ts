import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User; // Re-usage the user interface
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
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

  // declare module "next-auth/jwt" {
  //   interface JWT extends DefaultJWT{
  //     data: User;
  //   }
  // }
}
