import { auth } from "@/auth.config";
import { ProfileUncompleteAlert } from "@/components/dashboard/ProfileUncompleteAlert";
import { OpenSidebarButton } from "@/components/ui/sidebar/OpenSidebarButton";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { menuItemsDashboard } from "@/data/sidebar-menu-items";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const session = await auth()

  return (
    <>
      <main className="overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        <div className="flex h-full w-full">
          <OpenSidebarButton />
          <Sidebar menuItems={menuItemsDashboard}/>
          <div className="w-full flex justify-center text-slate-900 basis-full">
            {!session?.user.profile?.profileCompleted && (
              <ProfileUncompleteAlert />
            )}
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
