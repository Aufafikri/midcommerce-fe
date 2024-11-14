import { ProductType } from "@/types/product"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:8000/products")
            return response.data
        }
    })
}

export const useFetchProductById = (productId: string) => {
    return useQuery<ProductType>({
        queryKey: ["productId"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/products/${productId}`)
            return response.data
        }
    })
}