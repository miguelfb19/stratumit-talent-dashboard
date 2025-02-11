import { getEducationalProjects } from "@/actions/funnel/get-data-from-db/get-educational-projects";
import { auth } from "@/auth.config";
import { EducationalProjectsForm } from "@/components/funnel/EducationalProjectsForm";
import { NotProfileError } from "@/components/funnel/error/NotProfileError";
import { NotUserError } from "@/components/funnel/error/NotUserError";

export default async function EducationalProjectsFunnelPage() {
  const session = await auth();

  if (!session) return <NotUserError />;
  if (!session.user.profile) return <NotProfileError />;

  const { id: profileId } = session.user.profile;

  const resp = await getEducationalProjects(profileId);

  // transform data

  const projectsToForm = resp.educationalProjects?.map((item) => {
    return {
      projectName: item.projectName,
      description: item.description,
      startDate: item.startDate.toISOString().split("T")[0],
      finishDate: item.finishDate!.toISOString().split("T")[0],
      link: item.link,
    };
  });

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Educational Projects</h1>

      <EducationalProjectsForm
        profileId={profileId}
        projects={projectsToForm ? projectsToForm : null}
      />
    </div>
  );
}
