import { auth } from "@/auth.config";
import { ProfileUncompleteAlert } from "@/components/dashboard/ProfileUncompleteAlert";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { menuItemsDashboard } from "@/data/sidebar-menu-items";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/auth/login");

  return (
    <>
      <main className="overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        <div className="flex">
          <Sidebar menuItems={menuItemsDashboard} />
          <div className="w-full flex justify-center text-slate-900">
            {!session.user.profile?.profileCompleted && (
              <ProfileUncompleteAlert />
            )}
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
