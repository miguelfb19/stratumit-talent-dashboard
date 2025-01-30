import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "../providers/providers";
import { SessionProvider } from "next-auth/react";

import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Bootcamp Stratum IT",
  description: "Database for Talents (Job Candidates)",
  icons: {
    icon: "/favicon.ico",
  },
};

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ defaultTheme: "light" }}>
          <main>
            <SessionProvider>{children}</SessionProvider>
          </main>
        </Providers>
      </body>
    </html>
  );
}
