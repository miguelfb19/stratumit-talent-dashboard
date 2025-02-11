import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { LoginForm } from "@/components/login/LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) redirect("/dashboard/profile");

  return (
    <>
      <LoginForm />
    </>
  );
}
