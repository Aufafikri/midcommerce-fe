"use client";

import {
  useFetchPaginatedProducts,
  useFetchPrevProducts,
  useFetchProducts,
} from "@/features/product/useFetchProducts";
import { ProductType } from "@/types/product";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../../hooks/CartStore";
import { motion } from "framer-motion";
import { IoTrashOutline } from "react-icons/io5";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import convertRupiah from "rupiah-format";
import { trunCateText } from "@/utils/truncateText";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "@/components/products/Pagination";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const { data, isFetching } = useFetchPrevProducts(currentPage);

  const [selectedCartItems, setSelectedCartItems] = useState<string[]>([]);

  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCartStore();
  const [showCart, setShowCart] = useState(false);

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => selectedCartItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const router = useRouter();

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    window.location.href = `/products?page=${nextPage}`;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      window.location.href = `/products?page=${prevPage}`;
    }
  };

  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl">Midcommerces</h1>
        <div
          className="relative cursor-pointer"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
              {cartItems.length}
            </span>
          )}
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4">
        {data?.products.map((product: ProductType) => (
          <div key={product.id} className="shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover h-80 w-80 hover:scale-105 transition duration-300"
            />
            <h2 className="text-center text-xl font-semibold">
              {product.name}
            </h2>
            <div className="p-2">
              <p> {trunCateText(product.description, 50)}</p>
              <p>{convertRupiah.convert(product.price)}</p>
              <button
                className="p-2 border mt-2"
                onClick={() => {
                  addToCart(product);
                  if (!cartItems.some((item) => item.id === product.id)) {
                    addToCart(product);
                    toast.success("Your product added to cart!");
                  } else {
                    toast.error("This product is already in the cart!");
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="border p-1"
        >
          {"<"}
        </button>
        {/* <p className="mx-2"> {currentPage} </p> */}
        <Pagination currentPage={currentPage} />
        <button
          onClick={handleNextPage}
          disabled={data?.products.length < 8}
          className="border p-1"
        >
          {">"}
        </button>
      </div>

      {showCart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end z-50"
          onClick={() => setShowCart(false)}
        >
          <motion.div
            className="bg-white w-[370px] h-full p-4 overflow-y-auto"
            initial={{ x: "0%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowCart(false)}
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCartItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCartItems([...selectedCartItems, item.id]);
                        } else {
                          setSelectedCartItems(
                            selectedCartItems.filter((id) => id !== item.id)
                          );
                        }
                      }}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h3 className="text-md">{trunCateText(item.name, 10)}</h3>
                      <p className="text-gray-500 text-sm">
                        {trunCateText(convertRupiah.convert(item.price), 15)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => decrementQuantity(item.id)}>
                        <div className="border pl-2 pr-2">-</div>
                      </button>
                      <p> {item.quantity} </p>
                      <button onClick={() => incrementQuantity(item.id)}>
                        <div className="border pl-1.5 pr-1.5">+</div>
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-1 py-1 ml-4"
                      >
                        <IoTrashOutline size={24} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty!</p>
            )}
            <p className="mb-2">
              Total: {convertRupiah.convert(calculateTotalPrice())}
            </p>
            <button
              className={`w-full bg-green-500 text-white py-2 mt-4 rounded ${
                selectedCartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
              disabled={selectedCartItems.length === 0}
              onClick={() => {
                setShowCart(false);
                if (selectedCartItems.length > 0) {
                  router.push(
                    `/checkout?id=${cartItems[cartItems.length - 1].id}`
                  );
                } else {
                  alert("Your cart is empty!");
                }
              }}
            >
              Checkout
            </button>
          </motion.div>
        </motion.div>
      )}
      <Toaster />
    </div>
  );
};

export default ProductPage;
