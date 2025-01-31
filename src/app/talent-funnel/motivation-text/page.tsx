import { auth } from "@/auth.config";
import { MotivationTextForm } from "../../../components/funnel/MotivationTextForm";
import { createProfile } from "@/actions/funnel/save-data-to-db/create-profile";

export default async function NamePage() {

  const session = await auth()
  console.log(session?.user)

  // const userDb = await createProfile(session?.user.id) 
 
  return (
    <>
      <h1 className="w-full text-5xl text-blue-600 text-center font-bold">
        Talents
      </h1>
      <p className="w-full text-center text-sm">
        To complete your registration as a talent, please complete next
        information:
      </p>
      <MotivationTextForm />
    </>
  );
}
