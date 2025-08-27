import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 w-full md:max-w-md rounded-sm shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-600 text-center">Register</h1>
        <form>
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
          <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 mt-4 mb-6 cursor-pointer text-white py-2 rounded-md">
            Login
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