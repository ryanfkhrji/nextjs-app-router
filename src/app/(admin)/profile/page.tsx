"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session} = useSession();

  return (
    <>
      <div className="bg-gray-200 w-full h-96 rounded-lg flex justify-center items-center flex-col gap-4">
        <h1 className="text-2xl font-semibold">Profile Page</h1>
        <h3 className="text-lg">{session?.user?.fullname}</h3>
      </div>
    </>
  );
}