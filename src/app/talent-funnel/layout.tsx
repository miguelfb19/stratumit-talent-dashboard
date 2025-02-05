import { getPersonalData } from "@/actions/funnel/get-data-from-db/get-personal-data";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Talent information",
  description: "Funnel to get specific information of talent people",
};
export default async function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
  if (!session) redirect("/auth/login");

  const personalData = await getPersonalData(session.user.id)
  const {user} = personalData

  if(user?.profile?.timezone) redirect('/dashboard/profile?dataComplete=true')

  return (
    <div
      id="main"
      className="flex h-screen w-screen justify-center items-center bg-slate-500"
    >
      <div
        id="container"
        className="fade-in flex flex-col items-start justify-center text-center w-2/3 h-2/3 bg-white rounded-xl p-10 gap-5 shadow-2xl shadow-black"
      >
        {children}
      </div>
    </div>
  );
}
