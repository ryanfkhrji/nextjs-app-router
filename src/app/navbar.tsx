"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

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
        <button
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full cursor-pointer"
        onClick={() => {
          router.push("/login");
        }}
        >Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
