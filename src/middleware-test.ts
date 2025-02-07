// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { defineAbilityFor } from "@/lib/abilities";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//   console.log(req)

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // Build permissions with CASL
//   const ability = await defineAbilityFor(token.sub!);

//   const protectedRoutes = [
//     { path: "/dashboard/admin", action: "view", subject: "adminPage" },
//     { path: "/dashboard", action: "view", subject: "dashboard" },
//   ];

//   for (const route of protectedRoutes) {
//     if (req.nextUrl.pathname.startsWith(route.path)) {
//       if (!ability.can(route.action, route.subject)) {
//         return NextResponse.redirect(new URL("/403", req.url));
//       }
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/admin/:path*", "/dashboard/:path*"], // Protege estas rutas
// };
