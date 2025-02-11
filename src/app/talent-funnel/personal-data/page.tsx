import { getPersonalData } from "@/actions/funnel/get-data-from-db/get-personal-data";
import { auth } from "@/auth.config";
import { NotProfileError } from "@/components/funnel/error/NotProfileError";
import { NotUserError } from "@/components/funnel/error/NotUserError";
import { PersonalDataForm } from "@/components/funnel/PersonalDataForm";

export default async function UploadProfileImageFunnelPage() {
  const session = await auth();

  // Return error page is session dont exist
  if (!session) return <NotUserError />;
  if (!session?.user.profile) return <NotProfileError />;

  // Get data from DB
  const data = await getPersonalData(session.user.id!);

  const { user } = data;

  // Trasform data to form
  const userData = {
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    country: user ? user.country : "",
    birthDate: user ? user.birthDate.toISOString().split("T")[0] : "",
    phoneNumber:
      user && user.profile?.phoneNumber ? user.profile.phoneNumber : "",
    timezone: user && user.profile?.timezone ? user.profile.timezone : "",
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Personal data</h1>
      <PersonalDataForm
        userData={userData ? userData : null}
        userId={session.user.id!}
      />
    </div>
  );
}
