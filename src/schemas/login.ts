import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required") // Ensures the username is not empty
    .min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required") // Ensures the email is not empty
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required") // Ensures the password is not empty
    .min(6, "Password must be at least 6 characters"),
});
