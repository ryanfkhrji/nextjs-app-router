"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  // const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between gap-4 px-6 py-3 bg-white text-foreground shadow">
      <h1 className="font-bold">My Navbar</h1>
      <div>
        <ul className="flex space-x-4">
          <li className={`${pathname === "/" ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${pathname === "/about" ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}>
            <Link href="/about">About</Link>
          </li>
          <li className={`${pathname === "/about/profile" ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}>
            <Link href="/about/profile">Profile</Link>
          </li>
        </ul>
      </div>

      <div>
        {status === "authenticated" ? (
          <>
            <span className="text-gray-700 mr-4">Hello, {session.user.fullname}</span>
            <button
              className="border border-gray-700 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full cursor-pointer"
              onClick={() => {
                signIn();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full cursor-pointer"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
