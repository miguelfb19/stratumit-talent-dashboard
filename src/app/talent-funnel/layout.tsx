export const metadata = {
  title: "Talent information",
  description: "Funnel to get specific information of talent people",
};
export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="main"
      className="flex h-screen w-screen justify-center items-center bg-slate-500"
    >
      <div
        id="container"
        className="flex flex-col items-start justify-center text-center w-2/3 h-2/3 bg-white rounded-xl p-10 gap-5"
      >
        {children}
      </div>
    </div>
  );
}
