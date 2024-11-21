import { ProductType } from "@/types/product"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
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
  
  interface PaginatedProducts {
    products: ProductType[];
    page: number;
    totalPages: number;
  }

export const useFetchPaginatedProducts = (page: number) => {
    return useInfiniteQuery({
        queryKey: ["productsPaginated", page],
        queryFn: async ({ pageParam }) => {
            const response = await axios.get(`http://localhost:8000/products?page=${pageParam}&limit=8`)
            console.log('product api data', response.data)
            return response.data
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || typeof lastPage.page === 'undefined' || typeof lastPage.totalPages === 'undefined') {
                return undefined; // Return undefined if the structure is not as expected
            }
            const nextPage = lastPage.page + 1
            return nextPage <= lastPage.totalPages ? nextPage : undefined;
        },
        getPreviousPageParam: (firstPage) => {
            const prevPage = firstPage.page - 1
            return prevPage > 0 ? prevPage : undefined
        },
        initialPageParam: 1
    })
}

export const useFetchPrevProducts = (page: number) => {
    return useQuery({
        queryKey: ["prevPaginated", page],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}&limit=8`)
            return response.data
        },
    })
}