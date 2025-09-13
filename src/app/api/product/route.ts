import { NextResponse, NextRequest } from "next/server";

const data = [
  {
    id: 1,
    title: "Nike Air Max TL 2.5 White",
    price: 2849000,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/15fd60c2-97d5-42c0-a5b7-f0de129312e4/AIR+MAX+TL+2.5.png",
    category: "Mens Shoes",
    description: "Sepatu running dengan bantalan Air Max yang empuk, desain modern berwarna putih untuk tampilan sporty dan stylish.",
  },
  {
    id: 2,
    title: "Nike Air Max TL 2.5 Black",
    price: 2849000,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/18f2466d-426c-4d80-97dd-e9a129c0c859/AIR+MAX+TL+2.5.png",
    category: "Mens Shoes",
    description: "Varian hitam dari Air Max TL 2.5 dengan bantalan nyaman, cocok untuk aktivitas sehari-hari maupun olahraga.",
  },
  {
    id: 3,
    title: "Nike V5 RNR",
    price: 1399000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/57c540d7-df88-430b-95d7-58fdf2d04a73/NIKE+V5+RNR.png",
    category: "Women Shoes",
    description: "Sepatu lari ringan dengan desain breathable, memberikan kenyamanan maksimal untuk olahraga dan aktivitas kasual.",
  },
  {
    id: 4,
    title: "A'One 'Birthday Cake' EP",
    price: 1729000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/10cb0dca-924a-449f-afc0-309944ef0a08/A%27ONE+EP.png",
    category: "Women Shoes",
    description: "Sepatu edisi spesial dengan desain unik ‘Birthday Cake’, menghadirkan tampilan playful sekaligus trendi.",
  },
  {
    id: 5,
    title: "Nike Dunk Low Retro SE",
    price: 1909000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/797de1aa-b9dd-4405-a14b-34cb11dd759e/NIKE+DUNK+LOW+RETRO+SE.png",
    category: "Mens Shoes",
    description: "Sneakers klasik dengan desain low-cut dan detail retro, cocok untuk gaya streetwear dan koleksi sehari-hari.",
  },
  {
    id: 6,
    title: "Nike Dunk Low Retro SE",
    price: 1909000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1f2a4286-5d0f-48f8-aeac-78b2e59d8450/NIKE+DUNK+LOW+RETRO+SE.png",
    category: "Women Shoes",
    description: "Versi khusus untuk wanita dari Nike Dunk Low Retro SE, tetap mempertahankan gaya klasik yang ikonik.",
  },
  {
    id: 7,
    title: "Nike P6000 SE",
    price: 1729000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9d351f6c-e2c6-46a5-9236-0acafce30cf6/NIKE+P-6000+SE.png",
    category: "Mens Shoes",
    description: "Sneakers dengan gaya retro running, desain breathable mesh dan detail garis dinamis untuk tampilan sporty.",
  },
  {
    id: 8,
    title: "Nike Field General",
    price: 1549000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/68aa56ba-29a6-4ad5-8e12-6b7fe73091b7/WMNS+NIKE+FIELD+GENERAL.png",
    category: "Women Shoes",
    description: "Sepatu bernuansa klasik dengan sentuhan modern, ringan dan nyaman untuk aktivitas harian maupun santai.",
  },
  {
    id: 9,
    title: "Nike Cortez Textile",
    price: 1399000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3208bb1f-0135-495f-91bb-7bb6d87763c8/NIKE+CORTEZ+TXT.png",
    category: "Mens Shoes",
    description: "Model ikonik Cortez dengan bahan tekstil ringan, menghadirkan gaya retro yang timeless dan kasual.",
  },
  {
    id: 10,
    title: "Nike Zoom Vomero 5",
    price: 2489000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cd3dfb73-fc30-405e-965d-7522915f81d4/NIKE+ZOOM+VOMERO+5.png",
    category: "Women Shoes",
    description: "Sepatu running premium dengan bantalan Zoom Air responsif, cocok untuk lari jarak jauh dan kenyamanan ekstra.",
  },
];


export async function GET(request: NextRequest) {
  // ambil request dengan seacrh params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  // jika ada id, maka ambil detail product untuk id tersebut
  if (id) {
    const detailProduct = data.find((product) => product.id === Number(id));

    // cek jika detail product tidak ditemukan berdasarkan id
    if (!detailProduct) {
      return NextResponse.json({ status: 404, message: "Product not found", data: {} });
    }

    return NextResponse.json({ status: 200, message: "Success", data: detailProduct });
  }

  // jika ada category, maka ambil data product untuk category tersebut
  if (category) {
    const decodedCategory = decodeURIComponent(category);
    const categoryProduct = data.filter((product) => product.category === decodedCategory);

    return NextResponse.json({ status: 200, message: "Success", data: categoryProduct });
  }

  // jika tidak ada id, maka kembalikan semua data product
  return NextResponse.json({ status: 200, message: "Success", data: data });
}
