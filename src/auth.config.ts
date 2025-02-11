import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";

import prisma from "./lib/prisma";
import { isPasswordHashed } from "./utils/isPasswordHashed";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          // Search user in DB and get roles, permissions
          const user = await prisma.user.findFirst({
            where: { email },
            include: {
              roles: {
                select: {
                  role: {
                    include: { permissions: { include: { permission: true } } },
                  },
                },
              },
              profile: true,
            },
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

          // TRANSFORM AND GET ROLES AND PERMISSIONS
          const roles = user!.roles.map((userRole) => userRole.role.name);

          const permissions = roles.includes("Admin")
            ? user!.roles
                .find((role) => role.role.name === "Admin")!
                .role.permissions.map((permission) => ({
                  action: permission.permission.name.split("_")[0],
                  subject: permission.permission.name.split("_")[1],
                }))
            : user!.roles.flatMap((role) =>
                role.role.permissions.map((permission) => ({
                  action: permission.permission.name.split("_")[0],
                  subject: permission.permission.name.split("_")[1],
                })),
              );

          // Create information complete to return
          const userToReturn = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDate: user.birthDate,
            country: user.country,
            isVerified: user.isVerified,
            createdDate: user.createdDate,
            roles: roles,
            permissions: permissions,
            profile: user.profile
              ? {
                  id: user.profile.id,
                  phoneNumber: user.profile.phoneNumber,
                  timezone: user.profile.timezone,
                  imageUrl: user.profile.imageUrl,
                  profileCompleted: user.profile.profileCompleted,
                }
              : null,
          };

          return userToReturn;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // This callbacks allow me insert information user in client
    async jwt({ token, user }) {
      // Add information user info to token
      if (user) {
        token.data = user;
      }
      if (!token.sub) {
        return token;
      }

      //Update the permissions when its necesary
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!dbUser) {
        return token;
      }

      // TRANSFORM AND GET ROLES AND PERMISSIONS
      const roles = dbUser!.roles.map((userRole) => userRole.role.name);

      const permissions = roles.includes("Admin")
        ? dbUser!.roles
            .find((role) => role.role.name === "Admin")!
            .role.permissions.map((permission) => ({
              action: permission.permission.name.split("_")[0],
              subject: permission.permission.name.split("_")[1],
            }))
        : dbUser!.roles.flatMap((role) =>
            role.role.permissions.map((permission) => ({
              action: permission.permission.name.split("_")[0],
              subject: permission.permission.name.split("_")[1],
            })),
          );

      if (dbUser) {
        (token.data as any).roles = roles;
        (token.data as any).permissions = permissions;
      }

      // Return token to session
      return token;
    },
    async session({ session, token }) {
      // Search profile in DB
      const profile = await prisma.profile.findFirst({
        where: { userId: token.sub },
      });

      // Re-validation profile information in session
      if (!profile) {
        session.user = token.data as any;
        session.user.profile = null;
      } else {
        session.user = token.data as any;

        session.user.profile = {
          ...profile,
          phoneNumber: profile.phoneNumber ?? null,
          timezone: profile.timezone ?? null,
          imageUrl: profile.imageUrl ?? null,
          profileCompleted: profile.profileCompleted,
        };
      }

      // Extra verification the roles in case of changes on DB, change role in real time

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      // TRANSFORM AND GET ROLES AND PERMISSIONS
      const roles = user!.roles.map((userRole) => userRole.role.name);

      const permissions = roles.includes("Admin")
        ? user!.roles
            .find((role) => role.role.name === "Admin")!
            .role.permissions.map((permission) => ({
              action: permission.permission.name.split("_")[0],
              subject: permission.permission.name.split("_")[1],
            }))
        : user!.roles.flatMap((role) =>
            role.role.permissions.map((permission) => ({
              action: permission.permission.name.split("_")[0],
              subject: permission.permission.name.split("_")[1],
            })),
          );

      if (user) {
        session.user.roles = roles;
        session.user.permissions = permissions;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
