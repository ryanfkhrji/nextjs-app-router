"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  // set loading state
  const [loading, setLoading] = useState(false);

  // reset form state after submission
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // cara mengambol data dari inputan form
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // mencegah form submit secara default

    // ambil data dari form
    // const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;

    try {
      // set loading state to true
      setLoading(true);

      // send login request
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // kalau sukses → redirect / kasih feedback
      if (response.status === 200) {
        alert("Login success!");
      } else {
        alert(response.status || "Login failed");
      }

      //  clear input fields after submission
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      // set loading state to false
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 w-full md:max-w-md rounded-sm shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-600 text-center">Login</h1>
        <form onSubmit={(event) => handleLogin(event)} className="bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700" placeholder="example@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-gray-700" placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 mt-4 mb-6 cursor-pointer text-white py-2 rounded-md">
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-sm text-gray-500 text-center">
            Don`t have an account?{" "}
            <Link href="/register" className="text-gray-800 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
