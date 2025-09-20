"use client";

import { useState } from "react";

export default function AdminProductsPage() {
  const [status, setStatus] = useState("");

  const revalidate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revalidate?tag=products&secret=1234567890`, {
      method: "POST",
    });

    if (!res.ok) {
      setStatus("Revalidate failed");
    } else {
      const response = await res.json();
      if (response.revalidate) {
        setStatus("Revalidate success");
      }
    }
  };

  const setColorText = () => {
    if (status === "Revalidate success") {
      setTimeout(() => {
        setStatus("");
      }, 5000);
      return "text-green-500 animate-bounce";
    } else {
      setTimeout(() => {
        setStatus("");
      }, 5000);
      return "text-red-500 animate-bounce";
    }
  };

  return (
    <div className="flex justify-center items-center h-96 w-3/6 bg-gray-100 rounded-lg">
      <div className="flex flex-col gap-4">
        <h1>Admin Products Page</h1>
        <button onClick={revalidate} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full cursor-pointer">
          Revalidate
        </button>
        <p className={`mt-2 text-center ${setColorText()}`}>{status}</p>
      </div>
    </div>
  );
}
