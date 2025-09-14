// fetch data
export const getData = async (url: string) => {
  // const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch(url, {
    cache: "force-cache",
    // next: {
    //   tags: ["products"],
    //   // revalidate: 30,
    // },
  });
  // note: chache dan revalidate untuk memperbarui data setiap 30 detik, untuk kebutuhan performance

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
