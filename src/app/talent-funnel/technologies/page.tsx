import { TechnologiesForm } from "../../../components/funnel/TechnologiesForm";
export default function TechnologiesFunnelPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Technologies</h1>
      <TechnologiesForm />
    </div>
  );
}
