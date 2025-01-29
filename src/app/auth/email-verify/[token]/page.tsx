import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { submitAlert } from "@/utils/alerts";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function VerifyPage({ params }: Props) {
  const { token } = await params;
  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    if (decoded.email) {
      // First i have to find the user with the decoded email
      const user = await prisma.user.findFirst({
        where: {
          email: decoded.email,
        },
      });
      // Verify user exist
      if (!user) throw new Error("User not found");

      // Change field isVerified to true in user
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerified: true,
        },
      });
    }
    console.log(decoded.email);

  } catch (error) {
    console.error(error);
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-slate-500">
        <div className="flex flex-col items-start justify-center text-center w-1/2 h-1/2 bg-slate-50 rounded-xl p-20 gap-5">
          <h1 className="w-full text-3xl text-red-600 text-center">
            Failed verification
          </h1>
          <p className="w-full text-center text-sm">
            Toked is invalid or has expired
          </p>
        </div>
      </div>
    );
  }

  // Redirect to Login
  redirect("/auth/login?verified=true")

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-500">
      <div className="flex justify-center items-center w-1/2 h-1/2 bg-slate-50 rounded-xl p-10">
        <h1 className="text-2xl w-full text-center">Wait... We're verifing your account...</h1>
      </div>
    </div>
  );
}
