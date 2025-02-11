import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { RegisterForm } from "@/components/register/RegisterForm";

export default async function RegisterPage() {
  const session = await auth();

  if (session) redirect("/dashboard/profile");

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
