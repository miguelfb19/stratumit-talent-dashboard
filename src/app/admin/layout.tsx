import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { menuItemsAdmin } from "@/data/sidebar-menu-items";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        <div className="flex">
          <Sidebar menuItems={menuItemsAdmin} bgVariant="bg-slate-900"/>
          <div className="w-full flex justify-center text-slate-900">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
