import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type UserProfile = {
    id: string;
    name: string;
    email: string;
}

export const useFetchMyProfile = () => {
    return useQuery<UserProfile>({
        queryKey: ["profile"],
        queryFn: async () => {
            const token = localStorage.getItem('access_token')

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }
    })
}