import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { suratSchema } from "@/schemas/surat";
import { z } from "zod";

export const suratRouter = createTRPCRouter({
  buat: protectedProcedure
    .input(suratSchema)
    .mutation(async ({ ctx: { db, session }, input }) => {
      return db.surat.create({
        data: {
          nik: input.nik,
          nama: input.nama,
          nomorTelp: "+62" + input.telpon.toString(),
          suratId: input.suratId,
          userId: session.user.id,
        },
      });
    }),
  semuaSurat: protectedProcedure.query(async ({ ctx: { db } }) => {
    return db.surat.findMany()
  }),
  suratByUser: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    return db.surat.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        surat: true,
      },
    });
  }),
  suratUserByTipe: protectedProcedure.query(
    async ({ ctx: { db, session } }) => {
      return db.tipe.findMany({
        include: {
          daftar_surat: {
            where: {
              userId: session.user.id,
            },
          },
        },
      });
    },
  ),
  tipe: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.tipe.findMany();
  }),
  hapusSuratById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      return db.surat.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
