interface Props {
  redirectUrl?: string;
}

export const NotProfileError = ({ redirectUrl }: Props) => {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <h1 className="text-3xl font-bold mb-5 w-full text-red-500">Error</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p>You don't have a profile, please try again.</p>
      <a
        className="text-blue-600 hover:underline"
        href={redirectUrl ? redirectUrl : "/talent-funnel/motivation-text"}
      >
        Try again
      </a>
    </div>
  );
};
