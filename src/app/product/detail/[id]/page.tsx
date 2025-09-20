"use client";

import { use } from "react";
import Image from "next/image";
import useSWR from "swr";

type DetailProductPageProps = {
  params: Promise<{ id: string }>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DetailProductPage({ params }: DetailProductPageProps) {
  const { id } = use(params); // ✅ sekarang aman
  const productId = id;

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/product/?id=${productId}`, fetcher);

  const product = data?.data ?? {};

  return (
    <div className="mx-auto my-5 p-6">
      <div className="lg:w-1/2 mx-auto">
        <h1 className="text-center text-xl mt-10 mb-5 font-semibold">Detail Product</h1>
        <div className="flex justify-center items-center gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-300">
          <div className="w-fit mx-auto">
            <Image src={product?.image ?? "/placeholder.png"} alt={product?.title ?? "No title"} className="object-contain bg-cover bg-no-repeat bg-center w-full" width={500} height={500} />
          </div>
          <div>
            <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">{product?.title ?? "No Title"}</h5>
            <p className="text-sm text-gray-400 dark:text-gray-400 mb-3">Category: {product?.category ?? "-"}</p>
            <p className="text-sm text-gray-400 dark:text-gray-400 mb-4">Description: {product?.description ?? "-"}</p>
            <p className="text-md font-medium text-gray-900 dark:text-white">{product?.price ? product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "Rp 0"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
