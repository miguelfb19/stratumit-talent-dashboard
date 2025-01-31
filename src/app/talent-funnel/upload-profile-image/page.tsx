import { UploadImageForm } from '@/components/funnel/UploadImageForm';
export default function UploadProfileImageFunnelPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-5 w-full">Upload profile image</h1>
      <UploadImageForm />
    </div>
  );
}
