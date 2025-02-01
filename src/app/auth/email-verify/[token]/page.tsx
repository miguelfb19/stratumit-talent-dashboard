"use client";

import { authenticate } from "@/actions/auth/authenticate";
import { verifyRegisterToken } from "@/actions/auth/verify-register-token";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useParams() as { token: string };


  const handleVerification = async () => {
    // Loading the verification
    setIsLoading(true);

    // Call server action to verify token
    const verification = await verifyRegisterToken(token);

    // if something is wrong, show failed message and redirect to login
    if (!verification?.ok) {
      setMessage(
        verification?.message || "Something went wrong with the verification"
      );
      router.push("/auth/login");
    } else {
      // If everything is ok, show success message, authenticate user and redirect to funnel
      console.log(verification.user);
      setMessage("Email verified successfully, login...");
      await authenticate({
        email: verification.user!.email,
        password: verification.user!.password,
      });
      router.push("/talent-funnel/motivation-text");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-500">
      <div className="flex flex-col items-start justify-center text-center w-1/2 h-1/2 bg-slate-50 rounded-xl p-20 gap-5">
        <h1 className={clsx("w-full text-3xl text-center", {
          "text-green-500": message?.includes('successfully'),
          "text-red-600": message?.includes('wrong'),
        })}>
          {isLoading ? "Wait" : message}
        </h1>
        <p className="w-full text-center text-sm">
          {isLoading ? "We're verify your email address" : message}
        </p>
      </div>
    </div>
  );
}
