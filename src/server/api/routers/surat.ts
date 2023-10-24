import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { suratSchema } from "@/schemas/surat"

export const suratRouter = createTRPCRouter({
  buat: protectedProcedure
    .input(suratSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.surat.create({
        data: {
          nik: input.nik,
          nama: input.nama,
          nomorTelp: input.telpon.toString(),
          suratId: input.suratId,
          userId: ctx.session.user.id,
        }
      })
    }),
  suratByUser: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.tipe.findMany({
        include: {
          daftar_surat: {
            where: {
              userId: ctx.session.user.id
            }
          }
        },
      })
    }),
  tipe: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.tipe.findMany()
    }),
})