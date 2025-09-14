"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        fullname: (event.target as HTMLFormElement).fullname.value,
        email: (event.target as HTMLFormElement).email.value,
        password: (event.target as HTMLFormElement).password.value,
      }),
    });
    if (res.status === 200) {
      alert("Register success");
      (event.target as HTMLFormElement).reset();
      setLoading(false);
      push("/login");
    } else {
      setError("Email already exists");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 w-full md:max-w-md rounded-sm shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-600 text-center">Register</h1>
        {error !== "" && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <form onSubmit={(event) => handleSubmit(event)} className="bg-white p-6 rounded-md">
          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="fullname">
              Fullname
            </label>
            <input type="text" id="fullname" className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700" placeholder="John Doe" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700" placeholder="example@gmail.com" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700" placeholder="********" />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-gray-700 hover:bg-gray-800 mt-4 mb-6 cursor-pointer text-white py-2 rounded-md">
            {loading ? "Loading..." : "Register"}
          </button>
          <p className="text-sm text-gray-500 text-center">
            Have an account?{" "}
            <Link href="/login" className="text-gray-800 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
