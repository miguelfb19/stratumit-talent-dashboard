import { getJobExperiences } from "@/actions/funnel/get-data-from-db/get-job-experiences";
import { addTalentRole } from "@/actions/funnel/save-data-to-db/add-talent-role";
import { auth } from "@/auth.config";
import { NotProfileError } from "@/components/funnel/error/NotProfileError";
import { NotUserError } from "@/components/funnel/error/NotUserError";
import { JobExperiencesForm } from "@/components/funnel/JobExperiencesForm";

export default async function JobExperiencesFunnelPage() {
  const session = await auth();

  if (!session) return <NotUserError />;
  if (!session.user.profile) return <NotProfileError />;

  const { id: profileId } = session.user.profile;

  const resp = await getJobExperiences(profileId);

  // In the second step of funnel, we will add the "Talent" role to user
  await addTalentRole(session.user.id!);

  // transform data

  const jobExperiencestoForm = resp.careerTimeline?.map((item) => {
    return {
      company: item.company,
      description: item.description,
      startDate: item.startDate.toISOString().split("T")[0],
      finishDate: item.finishDate!.toISOString().split("T")[0],
      role: item.role,
    };
  });

  return (
    <div className="flex flex-col w-full h-full">
      <JobExperiencesForm
        jobExpFromDb={jobExperiencestoForm ? jobExperiencestoForm : null}
        profileId={profileId}
      />
    </div>
  );
}
