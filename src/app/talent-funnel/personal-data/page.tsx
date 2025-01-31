import { PersonalDataForm } from '@/components/funnel/PersonalDataForm';

export default function UploadProfileImageFunnelPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Personal data</h1>
      <PersonalDataForm/>
    </div>
  );
}
