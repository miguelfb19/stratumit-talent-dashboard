import { auth } from "@/auth.config";
import { MotivationTextForm } from "../../../components/funnel/MotivationTextForm";
import { createProfile } from "@/actions/funnel/save-data-to-db/create-profile";
import { getMotivationtext } from "@/actions/funnel/get-data-from-db/get-motivation-text";
import { saveMotivationText } from "@/actions/funnel/save-data-to-db/save-motivation-text";

export default async function NamePage() {
  const session = await auth();

  const profileDB = await createProfile(session?.user.id as string);

  const { profile, ok } = profileDB;

  if (!ok || !profile) {
    return (
      <>
        <h1 className="w-full text-5xl text-red-600 text-center font-bold">
          Error
        </h1>
        <p className="w-full text-center text-sm">
          could not get profile, try again later
        </p>
      </>
    );
  }

  const motivationTextData = await getMotivationtext(profile.id);
  const { data } = motivationTextData;

  return (
    <>
      <h1 className="w-full text-5xl text-blue-600 text-center font-bold">
        Talents
      </h1>
      <p className="w-full text-center text-sm">
        To complete your registration as a talent, please complete next
        information:
      </p>
      <MotivationTextForm motivationTextFromDb={data ? data : ""} profileId={profile.id}/>
    </>
  );
}
