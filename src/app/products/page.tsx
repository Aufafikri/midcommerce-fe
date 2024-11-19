"use client";

import { useFetchProducts } from "@/features/product/useFetchProducts";
import { ProductType } from "@/types/product";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../../hooks/CartStore";
import { motion } from "framer-motion";
import { IoTrashOutline } from "react-icons/io5";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const { data } = useFetchProducts();
  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCartStore();
  const [showCart, setShowCart] = useState(false);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const router = useRouter()

  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl">My Store</h1>
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

      {/* Product Grid */}
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

      {/* Cart Popup */}
      {showCart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end z-50"
          onClick={() => setShowCart(false)}
        >
          <motion.div
            className="bg-white w-[350px] h-full p-4 overflow-y-auto"
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
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h3 className="text-md">{item.name}</h3>
                      <p>Rp {item.price}</p>
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
            <p>Total: Rp {calculateTotalPrice()}</p>
            <button
              className="w-full bg-green-500 text-white py-2 mt-auto rounded hover:bg-green-600"
              onClick={() => {
                setShowCart(false);
                if (cartItems.length > 0) {
                  router.push(`/checkout?id=${cartItems[cartItems.length - 1].id}`);
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
    </div>
  );
};

export default ProductPage;
