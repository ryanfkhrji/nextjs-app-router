"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/login");
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        route.push("/");
      }
    }
  }, [route, session, session?.user.role, status]);


  return (
    <>
      <div className="bg-gray-200 w-full h-96 rounded-lg flex justify-center items-center">
        <h1>Dashboard</h1>
      </div>
    </>
  );
}
