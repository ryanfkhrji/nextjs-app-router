"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

// interface ProductPageProps {
//   params: { slug?: string[] }; // optional kalau tidak ada dynamic route
// }

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, fetcher);

  const products: Product[] = data?.data || [];

  return (
    <div>
      {/* title */}
      <h1 className="text-center text-xl mt-10 mb-5">Products</h1>

      {/* load data products */}
      <div className="px-4 md:px-10 lg:px-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Link href={`/product/detail/${product.id}`} className="w-full bg-white dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                <Image className="object-cover bg-cover bg-no-repeat bg-center w-full h-[300px]" src={product.image || "/windows.svg"} alt={product.title || "No title"} width={500} height={500} loading="lazy" />
                <div className="p-1 mt-1.5">
                  <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white line-clamp-1">{product.title}</h5>
                  <p className="text-sm text-gray-400 dark:text-gray-400">{product.category}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-md font-medium text-gray-900 dark:text-white">
                      {product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                    <button
                      type="button"
                      className="bg-gray-700 hover:bg-gray-800 text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-50 dark:hover:bg-gray-100 dark:focus:ring-gray-100 dark:text-gray-700"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center mt-10">Product Is Empty</p>
          )}
        </div>
      </div>

      {/* slug */}
      {/* {params?.slug && (
        <>
          <p>Brand: {params.slug[0]}</p>
          <p>Category: {params.slug[1]}</p>
          <p>Product: {params.slug[2]}</p>
        </>
      )} */}
    </div>
  );
}
