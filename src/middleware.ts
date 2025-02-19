import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { defineAbilityFor } from "@/lib/abilities";

export async function middleware(req: NextRequest) {
  // Get token
  const token = await getToken({
    req,
    secret: "2gwCrOMF2B7yjOT1j/ctnc/4xGoLG9B9RJNqQ8suptE=",
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Get permissions with CASL
  const ability = await defineAbilityFor((token.data as any).permissions);

  // Define protected routes
  const protectedRoutes = [
    { path: "/admin", action: "view", subject: "adminPage" },
    { path: "/dashboard", action: "view", subject: "dashboard" },
  ];

  for (const route of protectedRoutes) {
    if (req.nextUrl.pathname.startsWith(route.path)) {
      if (!ability.can(route.action, route.subject)) {
        if (route.path === "/dashboard") {
          return NextResponse.redirect(new URL("/403?talent=false", req.url));
        }

        return NextResponse.redirect(new URL("/403", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // Protected routes
};
