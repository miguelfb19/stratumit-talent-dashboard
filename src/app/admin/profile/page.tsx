// import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { UserInfo } from "@/components/dashboard/UserInfo";

export default async function AdminProfilePage() {
  const session = await auth();

  // if (!session?.user) redirect("/auth/login");

  // const { user } = session;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-700">
      <UserInfo isAdmin user={session!.user} />
    </div>
  );
}
