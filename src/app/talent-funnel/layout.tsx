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

  // get session
  const session = await auth();
  if (!session) redirect("/auth/login");

  // Get personal data from DB
  const personalData = await getPersonalData(session.user.id!)
  const {user} = personalData

  // If profile is complete. redirect to user dashboard
  if(user?.profile?.profileCompleted) redirect('/dashboard/profile?profileComplete=true')

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
