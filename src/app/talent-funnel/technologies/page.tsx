import { auth } from "@/auth.config";
import { TechnologiesForm } from "../../../components/funnel/TechnologiesForm";
import { getTechnologiesFromDb } from "@/actions/funnel/get-data-from-db/get-technologies";
import { NotUserError } from "@/components/funnel/error/NotUserError";
import { NotProfileError } from "@/components/funnel/error/NotProfileError";
export default async function TechnologiesFunnelPage() {
  // Get session
  const session = await auth();

  // Return error page is session dont exist
  if(!session) return <NotUserError/>
  if (!session?.user.profile) return <NotProfileError/>

    // Get profile Technologies
  const profileTechnologies = await getTechnologiesFromDb(
    session.user.profile.id
  );
  // Obtain data
  const { data } = profileTechnologies;

  // Transform data to send to show in form
  const onlyTechnologyArray = data?.map((tech) => {
    return tech.technology.name;
  });

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-5 w-full">Technologies</h1>
      <TechnologiesForm
        profileId={session.user.profile.id}
        technologiesFromDb={onlyTechnologyArray ? onlyTechnologyArray : []}
      />
    </div>
  );
}
