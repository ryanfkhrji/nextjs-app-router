interface ProductPageProps {
  params: { slug: string[] };
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

// fetch data
async function getData() {
  // const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch("http://localhost:3000/api/product", { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductPage(props: ProductPageProps) {
  const { params } = await props;

  // Fetch data from an API
  const products = await getData();

  return (
    <div>
      {/* title */}
      <h1 className="text-center text-xl mt-10 mb-5">{params.slug ? "Detail Product" : "Products"}</h1>

      {/* select berdasarkan category */}
      <div className="w-full md:max-w-screen-md mx-auto overflow-auto mb-10">
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
      </div>

      {/* load data products */}
      <div className="px-4 md:px-10 lg:px-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.data.length > 0 ? (
            products.data.map((product: ProductPageProps) => (
              <div className="w-full bg-white dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                <a href="#">
                  <img className="object-cover bg-cover bg-no-repeat bg-center w-full h-[300px]" src={product.image || "/windows.svg"} alt={product.title || "No title"} />
                </a>
                <div className="p-1 mt-1.5">
                  <a href="#">
                    <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white line-clamp-1">{product.title}</h5>
                    <p className="text-sm text-gray-400 dark:text-gray-400">{product.category}</p>
                  </a>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-md font-medium text-gray-900 dark:text-white">{product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    <a
                      href="#"
                      className="bg-gray-700 hover:bg-gray-800 text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-50 dark:hover:bg-gray-100 dark:focus:ring-gray-100 dark:text-gray-700"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
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
