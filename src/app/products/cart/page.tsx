// CartPage.tsx
"use client"

import React from "react";
import { useCartStore } from "../../../../hooks/CartStore";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, clearCart } =
    useCartStore();

    const router = useRouter()
  const calculateTotalPrice = (price: number, quantity: number) => price * quantity;

  return (
    <div className="p-4">
      <h2 className="text-2xl">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mb-4">
            Clear Cart
          </button>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((product) => (
              <div key={product.id} className="shadow-md p-2 flex items-center">
                <img src={product.image} alt="" className="w-20 h-20 mr-4" />
                <div className="flex-1">
                  <h3>{product.name}</h3>
                  <p>Price per item: Rp {product.price}</p>
                  <p>Total: Rp {calculateTotalPrice(product.price, product.quantity)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      className="bg-gray-300 text-black px-2 py-1"
                    >
                      -
                    </button>
                    <span className="mx-4">{product.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(product.id)}
                      className="bg-gray-300 text-black px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-4"
                >
                  Remove
                </button>
                <button
                  onClick={() => router.push(`/checkout?id=${product.id}`)}
                  className="bg-green-500 text-white px-4 py-2 ml-4"
                >
                  Checkout
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
