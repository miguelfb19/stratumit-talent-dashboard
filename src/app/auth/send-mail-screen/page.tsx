export default function SendMailScreen() {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-500">
      <div className="flex flex-col items-start justify-center text-center w-1/2 h-1/2 bg-slate-50 rounded-xl p-20 gap-5">
        <h1 className="w-full text-3xl text-green-600 text-center">
          Verification Email Sended
        </h1>
        <p className="w-full text-center text-sm">
          We're send you a verification mail to your email direction. Please check
          it to continue
        </p>
        <a href="/" className="text-sm text-blue-500 w-full text-center">Return to home</a>
      </div>
    </div>
  );
}
