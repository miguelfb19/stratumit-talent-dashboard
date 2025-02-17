import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { SessionProvider } from "next-auth/react";

import { Providers } from "../providers/providers";

import { fontSans } from "@/config/fonts";
import { AbilityProvider } from "@/providers/AbilityProvider";

export const metadata: Metadata = {
  title: "Talent Funnel",
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

export default async function RootLayout({
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
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ defaultTheme: "light" }}>
          <main>
            <SessionProvider>
              <AbilityProvider>{children}</AbilityProvider>
            </SessionProvider>
          </main>
        </Providers>
      </body>
    </html>
  );
}
