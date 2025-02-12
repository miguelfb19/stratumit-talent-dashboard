import { MotivationTextForm } from "@/components/funnel/MotivationTextForm";
import { auth } from "@/auth.config";
import { createProfile } from "@/actions/funnel/save-data-to-db/create-profile";
import { getMotivationtext } from "@/actions/funnel/get-data-from-db/get-motivation-text";
import { NotUserError } from "@/components/funnel/error/NotUserError";
import { Loading } from "@/components/ui/Loading";

export default async function MotivationTextPage() {
  const session = await auth();

  const profileDB = await createProfile(session?.user.id as string);

  const { profile, ok } = profileDB;

  if (!session) return <NotUserError />;
  if (!profile || !ok) {
    return <Loading reload />;
  }
  const resp = await getMotivationtext(profile.id);
  const { data } = resp;

  return (
    <>
      <MotivationTextForm
        motivationTextFromDb={data ? data : ""}
        profileId={profile.id}
      />
    </>
  );
}
