import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "username tidak boleh kosong" })
    .max(20, { message: "username tidak boleh lebih dari 20 karakter" }),
  password: z.string().min(1, { message: "password harus diisi" }),
});
