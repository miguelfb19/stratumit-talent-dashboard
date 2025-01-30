import { JobExperiencesForm } from "@/components/funnel/JobExperiencesForm";

export default function JobExperiencesFunnelPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Job Experiences</h1>

      <JobExperiencesForm />
    </div>
  );
}
