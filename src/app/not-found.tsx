import Link from "next/link";

export default function NotFoundHomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl">Page Not Found</h1>
      <Link className="text-blue-500 mt-5" href="/">
        Return to home
      </Link>
    </div>
  );
}
