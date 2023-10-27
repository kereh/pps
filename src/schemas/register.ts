import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "nama tidak boleh kosong" })
    .max(100, { message: "nama tidak boleh lebih dari 100 karakter" }),
  username: z
    .string()
    .min(1, { message: "username tidak boleh kosong" })
    .max(20, { message: "username tidak boleh lebih dari 20 karakter" }),
  password: z.string().min(1, { message: "password harus diisi" }),
});
