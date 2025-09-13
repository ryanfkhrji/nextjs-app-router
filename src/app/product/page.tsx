// NEW CODE WITH CATEGORY FILTER
// "use client";

import { getData } from "@/services/products";
import Link from "next/link";

// import { useState, useEffect } from "react";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // fungsi fetch data dari API
//   const getProducts = async (category?: string) => {
//     setLoading(true);
//     try {
//       let url = "http://localhost:3000/api/product";
//       if (category && category !== "All") {
//         url += `?category=${encodeURIComponent(category)}`;
//       }

//       const res = await fetch(url, {
//         cache: "force-cache",
//         next: {
//           tags: ["products"],
//           // revalidate: 30,
//         },
//       });
//       const json = await res.json();
//       setProducts(json.data || []);
//     } catch (error) {
//       console.error("Fetch products failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProducts(); // load awal semua produk
//   }, []);

//   const categories = ["All", "Mens Shoes", "Women Shoes"];

//   return (
//     <div>
//       <h1 className="text-center text-xl mt-10 mb-5">Products</h1>

//       {/* tombol kategori */}
//       <div className="w-full md:max-w-screen-md mx-auto overflow-auto mb-10">
//         <div className="flex justify-center items-center gap-3">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setSelectedCategory(cat);
//                 getProducts(cat);
//               }}
//               className={`px-4 py-1.5 cursor-pointer border rounded-full cursor-pointer ${selectedCategory === cat ? "bg-gray-700 text-white" : "bg-white border-gray-700 hover:bg-gray-700 hover:text-white"}`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* daftar produk */}
//       <div className="px-4 md:px-10 lg:px-20 mb-20">
//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div className="w-full bg-white dark:bg-gray-800 dark:border-gray-700" key={product.id}>
//                   <img src={product.image} alt={product.title} className="object-cover bg-cover bg-no-repeat bg-center w-full h-[300px]" />
//                   <div className="p-1 mt-1.5">
//                     <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white line-clamp-1">{product.title}</h5>
//                     <p className="text-sm text-gray-400 dark:text-gray-400">{product.category}</p>
//                     <div className="flex items-center justify-between mt-6">
//                       <span className="text-md font-medium text-gray-900 dark:text-white">
//                         {product.price.toLocaleString("id-ID", {
//                           style: "currency",
//                           currency: "IDR",
//                         })}
//                       </span>
//                       <button className="bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer">Add to cart</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center mt-10">Product Is Empty</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// OLD CODE NO CATEGORY FILTER
interface ProductPageProps {
  params: { slug: string[] };
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default async function ProductPage(props: ProductPageProps) {
  const { params } = await props;

  // Fetch data from an API
  const products = await getData("http://localhost:3000/api/product");

  return (
    <div>
      {/* title */}
      <h1 className="text-center text-xl mt-10 mb-5">{params.slug ? "Detail Product" : "Products"}</h1>

      {/* select berdasarkan category */}
      {/* <div className="w-full md:max-w-screen-md mx-auto overflow-auto mb-10">
        <div className="flex justify-center items-center gap-3">
          <button type="button" className="px-4 py-1.5 cursor-pointer bg-white border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white">
            All
          </button>
          <button type="button" className="px-4 py-1.5 cursor-pointer bg-white border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white">
            Mens Shoes
          </button>
          <button type="button" className="px-4 py-1.5 cursor-pointer bg-white border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white">
            Women Shoes
          </button>
        </div>
      </div> */}

      {/* load data products */}
      <div className="px-4 md:px-10 lg:px-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.data.length > 0 ? (
            products.data.map((product: ProductPageProps) => (
              <Link href={`/product/detail/${product.id}`} className="w-full bg-white dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                <img className="object-cover bg-cover bg-no-repeat bg-center w-full h-[300px]" src={product.image || "/windows.svg"} alt={product.title || "No title"} />
                <div className="p-1 mt-1.5">
                  <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white line-clamp-1">{product.title}</h5>
                  <p className="text-sm text-gray-400 dark:text-gray-400">{product.category}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-md font-medium text-gray-900 dark:text-white">{product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
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
      {params.slug ? (
        <>
          <p>Brand: {params.slug[0]}</p>
          <p>Category: {params.slug[1]}</p>
          <p>Product: {params.slug[2]}</p>
        </>
      ) : null}
    </div>
  );
}
