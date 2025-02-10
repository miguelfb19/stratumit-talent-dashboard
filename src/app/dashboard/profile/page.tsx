import { auth } from "@/auth.config";
import { UserInfo } from "@/components/dashboard/UserInfo";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  const { user } = session;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
      <UserInfo user={user} />
    </div>
  );
}
