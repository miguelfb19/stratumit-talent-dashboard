import { auth } from "@/auth.config";
import { UserInfo } from "@/components/dashboard/UserInfo";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const { user } = session;

  return <UserInfo user={user} isAdmin/>;
}
