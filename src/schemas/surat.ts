import { z } from "zod";

export const suratSchema = z.object({
  nik: z
    .string()
    .min(1, { message: "NIK harus diisi" })
    .max(16, { message: "NIK tidak boleh lebih dari 16 karakter" }),
  nama: z
    .string()
    .min(1, { message: "NAMA harus diisi" })
    .max(75, { message: "NAMA hanya bisa sampai 75 karakter" }),
  // telpon: z.string()
  //   .min(1, { message: "NOMOR TELEPON tidak boleh kosong" }),
  telpon: z.number(),
  suratId: z.string().min(1, { message: "ID surat kosong" }),
});
