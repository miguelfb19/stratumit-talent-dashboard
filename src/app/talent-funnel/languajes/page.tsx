import { getLanguajesFromDb } from "@/actions/funnel/get-data-from-db/get-languajes";
import { auth } from "@/auth.config";
import { LanguajeForm } from "@/components/funnel/LanguajeForm";

export default async function LanguajesFunnelPage() {

  const session = await auth()

  if(!session?.user.profile) return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Error, not profile exist</h1>
    </div>
  )

  const resp = await getLanguajesFromDb(session.user.profile.id)

  // Transform response on LanguajeForm expected data

  const {languajes}= resp
  const dataToForm = languajes?.map((languaje: any) => {
    return {
      name: languaje.languaje,
      level: languaje.level,
    }
  })

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Languajes</h1>
      <LanguajeForm languajesFromDb={dataToForm ? dataToForm : null} profileId={session.user.profile.id}/>
    </div>
  );
}
