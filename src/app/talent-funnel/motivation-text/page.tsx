import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { MotivationTextForm } from '../../../components/funnel/MotivationTextForm';

export default async function NamePage() {

  const session = await auth()
  if(!session) redirect('/')

  return (
    <div id="main" className="flex h-screen w-screen justify-center items-center bg-slate-500">
      <div id="container" className="flex flex-col items-start justify-center text-center w-2/3 h-2/3 bg-white rounded-xl p-10 gap-5">
        <h1 className="w-full text-5xl text-blue-600 text-center font-bold">
          Talents
        </h1>
        <p className="w-full text-center text-sm">
          To complete your registration as a talent, please complete next information:
        </p>
        <MotivationTextForm />
      </div>
    </div>
  );
}
