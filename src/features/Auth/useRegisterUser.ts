import { useMutation } from "@tanstack/react-query"
import axios from "axios"

type userRegister = {
    name: string;
    email: string;
    password: string;
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (body: userRegister) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`, body)
            return response.data
        }
    })
}