"use client";

import { use } from "react";
import Modal from "@/components/core/Modal";
import Image from "next/image";
import useSWR from "swr";

type DetailProductPageProps = {
  params: Promise<{ id: string }>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ModalPage({ params }: DetailProductPageProps) {
  const { id } = use(params); // ✅ Unwrap params
  const productId = id;

  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/product/?id=${productId}`, fetcher);

  const product = data?.data ?? {}; // ✅ default ke object kosong

  if (isLoading) {
    return (
      <Modal>
        <p className="text-center text-gray-500 p-6">Loading...</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <h1 className="text-center text-xl mt-10 mb-5 font-semibold">Detail Product</h1>
      <div className="flex justify-center items-center gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-300">
        <div className="w-fit mx-auto">
          <Image src={product?.image ?? "/placeholder.png"} alt={product?.title ?? "No title"} className="object-contain bg-cover bg-no-repeat bg-center w-full" width={500} height={500} />
        </div>
        <div>
          <h5 className="text-lg font-medium tracking-tight text-gray-900">{product?.title ?? "No Title"}</h5>
          <p className="text-sm text-gray-400 mb-3">Category: {product?.category ?? "-"}</p>
          <p className="text-sm text-gray-400 mb-4">Description: {product?.description ?? "-"}</p>
          <p className="text-md font-medium text-gray-900">
            {product?.price
              ? product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              : "Rp 0"}
          </p>
        </div>
      </div>
    </Modal>
  );
}
