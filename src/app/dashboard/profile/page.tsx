'use client'

import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

export default function ProfilePage() {

  // const session = await auth()

  const logoutSession = async () => {
    await signOut({redirectTo: '/auth/login'})
  };
  
    // console.log('SESSION: ', session)
    // if(!session) redirect('/')
  return (
    <div id="main" className="flex h-screen w-screen justify-center items-center bg-slate-500">
      <div id="container" className="flex flex-col items-start justify-center text-center w-1/2 h-1/2 bg-slate-50 rounded-xl p-20 gap-5">
        <h1 className="w-full text-3xl text-blue-600 text-center">
          Edit profile page
        </h1>
        <Button onPress={logoutSession} color="secondary" variant="flat" className="self-center shadow-xl">Logout</Button>
      </div>
    </div>
  );
}