import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, "name can be 1 caracter").max(10, "name can only 10 caracter"),
    email: z.string().email(),
    password: z.string().min(1).max(200)
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(200)
})