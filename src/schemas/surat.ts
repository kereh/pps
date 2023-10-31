import { z } from "zod";

export const suratSchema = z.object({
  nik: z.string(),
  nama: z.string(),
  telpon: z.number(),
  suratId: z.string().min(1, { message: "ID surat kosong" }),
});
