import {email, z} from "zod";

export const UserSchema = z.object({
    username:z.string().min(3).max(20),
    password: z.string().min(6,"Must be atleast 6 characters long"),
    email: z.email(),

})


export const SigninSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string()
})

export const RoomSchema = z.object({
    name: z.string().min(3).max(20), 
})