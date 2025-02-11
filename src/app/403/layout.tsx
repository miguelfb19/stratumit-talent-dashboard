import { Suspense } from "react";

export default function ForbiddenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
