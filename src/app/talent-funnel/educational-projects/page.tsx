import { EducationalProjectsForm } from "../../../components/funnel/EducationalProjectsForm";

export default function EducationalProjectsFunnelPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Educational Projects</h1>

      <EducationalProjectsForm />
    </div>
  );
}
