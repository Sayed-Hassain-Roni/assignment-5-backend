import { z } from "zod";

// Define the Zod schema for TUser..
export const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.enum(["admin", "user"]),
  address: z.string(),
});
export const LoginValidationSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
  password: z.string(),
});
