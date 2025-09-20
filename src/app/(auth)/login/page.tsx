"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, use } from "react";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // ✅ gunakan React.use() untuk un-wrap searchParams
  const params = use(searchParams);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { push } = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const callbackUrl = (params?.callbackUrl as string) || "/";

    try {
      setLoading(true);
      setError(null);

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        alert("Login success");
        push(callbackUrl);
      } else {
        if (res.status === 401) {
          setError("Invalid email or password");
        } else {
          setError("Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 w-full md:max-w-md rounded-sm shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-600 text-center">Login</h1>

        {/* ✅ tampilkan error hanya jika ada */}
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-md">
          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" // ✅ penting untuk form.elements.namedItem bekerja
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // ✅ sama seperti di atas
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gray-700 hover:bg-gray-800 mt-4 mb-6 cursor-pointer text-white py-2 rounded-md">
            {loading ? "Loading..." : "Login"}
          </button>

          <hr />

          <button type="button" onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full border border-gray-700 hover:bg-gray-100 mt-4 mb-6 cursor-pointer text-gray-700 py-2 rounded-md">
            Login with Google
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-gray-800 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
