export const NotUserError = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <h1 className="text-3xl font-bold mb-5 w-full text-red-500">Error</h1>
      <p>You need to logged in to see this page.</p>
      <a href="/auth/login" className="text-blue-600 hover:underline">
        Login
      </a>
    </div>
  );
};
