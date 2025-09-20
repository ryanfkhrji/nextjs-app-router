import Modal from "@/components/core/Modal";
import { getData } from "@/services/products";
import Image from "next/image";

type DetailProductPageProps = {
  params: { id: string };
};

export default async function ModalPage(
  props: DetailProductPageProps) {
  const { params } = props;
  const productId = params.id;

  // get data
  const product = await getData(`http://localhost:3000/api/product/?id=${productId}`);

  return (
    <Modal>
      <h1 className="text-center text-xl mt-10 mb-5 font-semibold">Detail Product</h1>
      <div className="flex justify-center items-center gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-300">
        <div className="w-fit mx-auto">
          <Image src={product.data.image} alt={product.data.title} className="object-contain bg-cover bg-no-repeat bg-center w-full" width={500} height={500} />
        </div>
        <div>
          <h5 className="text-lg font-medium tracking-tight text-gray-900">{product.data.title}</h5>
          <p className="text-sm text-gray-400 mb-3">Category: {product.data.category}</p>
          <p className="text-sm text-gray-400 mb-4">Description: {product.data.description}</p>
          <p className="text-md font-medium text-gray-900">
            {product.data.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
    </Modal>
  );
}
