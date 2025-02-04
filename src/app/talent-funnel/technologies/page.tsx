import { auth } from "@/auth.config";
import { TechnologiesForm } from "../../../components/funnel/TechnologiesForm";
import { getTechnologiesFromDb } from "@/actions/funnel/get-data-from-db/get-technologies";
import { TechCategory } from "@/data/seed/seed-data";
export default async function TechnologiesFunnelPage() {
  // Get session
  const session = await auth();

  // Return error page is session dont exist
  if (!session || !session?.user.profile)
    return (
      <div className="flex flex-col w-full h-full">
        <h1 className="text-3xl font-bold mb-5 w-full">
          Error, not profile exist
        </h1>
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </div>
    );

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
