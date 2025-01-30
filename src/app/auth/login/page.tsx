import { auth } from "@/auth.config";
import { LoginForm } from "../../../components/login/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  const session = await auth()

  if(session) redirect('/dashboard/profile')

  return (
    <>
      <LoginForm />
    </>
  );
}
