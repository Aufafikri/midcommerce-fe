"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartItem } from "@/types/cartItem"; // sesuaikan dengan tipe data CartItem
import { useCartStore } from "../../../hooks/CartStore";
import { useFetchMyProfile } from "@/features/profile/useFetchMyProfile";
import { useFetchProductById } from "@/features/product/useFetchProducts";
import toast, { Toaster } from "react-hot-toast";
import { useCheckout } from "@/features/checkout/useCheckout";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const { data: userProfile } = useFetchMyProfile()
  const productId: any = searchParams.get("id");
  const { data: productData } = useFetchProductById(productId)
  const { cartItems } = useCartStore();
  const [product, setProduct] = useState<CartItem | null>(null);
  const { mutate } = useCheckout()

  const profileId = userProfile?.id
  const profileEmail = userProfile?.email
  const profileName = userProfile?.name

  useEffect(() => {
    if (productId) {
      const selectedProduct = cartItems.find((item) => item.id === productId);
      setProduct(selectedProduct || null);
    }
  }, [productId, cartItems]);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey: any = process.env.NEXT_PUBLIC_API_MIDTRANS_CLIENT_KEY

    console.log('Server Key:', process.env.NEXT_PUBLIC_API_MIDTRANS_CLIENT_SERVER);

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
        document.body.removeChild(script)
    }
  }, [])

  if (!product) {
    return <p>Product not found</p>;
  }

  const confirmPurchase = async () => {
    const orderId = `ORDER-${Date.now()}`;
    const grossAmount = product.price * product.quantity;

    try {
      
      mutate(
        {
          orderId: orderId,
          grossAmount: grossAmount,
          name: profileName!,
          email: profileEmail!,
          productId: productId!,
          userId: profileId!,
          productName: productData?.name,
          productPrice: productData?.price,
          quantity: product.quantity,
        },
        {
          onSuccess: ({ token }) => {
            window.snap.pay(token, {
              onSuccess: (result: any) => {
                console.log("Payment Success:", result);
                window.location.href = "/status/payment-successfully";
              },
              onPending: (result: any) => {
                console.log("Payment Pending:", result);
                window.location.href = "/status/pending";
              },
              onError: (result: any) => {
                console.error("Payment Error:", result);
                toast.error("Oops! Something went wrong.");
              },
              onClose: () => {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
                toast.error("Your payment was closed!");
              },
            });
          },
          onError: (error) => {
            console.error("Transaction creation failed:", error);
            toast.error("Oops! Something went wrong.");
          },
        }
      );
    } catch (error) {
      toast.error("somethings error")
    }
};

  return (
    <div className="p-4">
      <h2 className="text-2xl">Checkout</h2>
      <div className="shadow-md p-4 mt-4">
        <img src={product.image} alt="" className="w-40 h-40" />
        <h3 className="text-xl">{product.name}</h3>
        <p>Price: Rp {product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Total Price: Rp {product.price * product.quantity}</p>

        <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={confirmPurchase}>
          Confirm Purchase
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default CheckoutPage;
``