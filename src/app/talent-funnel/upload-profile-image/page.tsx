import { getImageUrl } from "@/actions/funnel/get-data-from-db/get-image-url";
import { auth } from "@/auth.config";
import { NotProfileError } from "@/components/funnel/error/NotProfileError";
import { NotUserError } from "@/components/funnel/error/NotUserError";
import { UploadImageForm } from "@/components/funnel/UploadImageForm";
export default async function UploadProfileImageFunnelPage() {
  const session = await auth();

  // Return error page is session dont exist
  if (!session) return <NotUserError />;
  if (!session?.user.profile) return <NotProfileError />;

  // get image from DB
  const data = await getImageUrl(session.user.profile.id);

  const { imageUrl } = data;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold w-full">Upload profile image</h1>
      <UploadImageForm
        profileId={session.user.profile.id}
        imageUrl={imageUrl ? imageUrl : null}
      />
    </div>
  );
}
