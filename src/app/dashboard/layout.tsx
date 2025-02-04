import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


    const session = await auth()

    if(!session) redirect('/auth/login')

  return <>{children}</>;
}
