// ProductPage.tsx
"use client";

import { useFetchProducts } from "@/features/product/useFetchProducts";
import { ProductType } from "@/types/product";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../../hooks/CartStore";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const { data } = useFetchProducts();
  const { cartItems, addToCart } = useCartStore();
  const router = useRouter()

  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl">My Store</h1>
        <div className="relative" onClick={() => router.push('/products/cart')} >
          <FaShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
              {cartItems.length}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        {data?.map((product: ProductType) => (
          <div key={product.id} className="shadow-md p-2">
            <img src={product.image} alt="" className="w-80 h-80" />
            <h1 className="text-xl mt-2">{product.name}</h1>
            <p>Rp {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
