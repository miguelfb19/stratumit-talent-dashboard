import { MotivationTextForm } from "../../../components/funnel/MotivationTextForm";

export default async function NamePage() {
 

  return (
    <>
      <h1 className="w-full text-5xl text-blue-600 text-center font-bold">
        Talents
      </h1>
      <p className="w-full text-center text-sm">
        To complete your registration as a talent, please complete next
        information:
      </p>
      <MotivationTextForm />
    </>
  );
}
