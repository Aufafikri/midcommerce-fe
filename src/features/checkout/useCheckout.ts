import { useMutation } from "@tanstack/react-query"
import axios from "axios"

type checkoutTypes = {
    orderId: string;
    grossAmount: number;
    name: string;
    email: string;
    productId: string;
    userId: string;
    productName: string | undefined;
    productPrice: number | undefined;
    quantity: string;
}

export const useCheckout = () => {
    return useMutation({
        mutationFn: async (body: checkoutTypes) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction`, body)

            return response.data
        }
    })
}