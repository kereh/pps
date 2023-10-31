import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { suratSchema } from "@/schemas/surat";
import { z } from "zod";

export const suratRouter = createTRPCRouter({
  buat: protectedProcedure
    .input(suratSchema)
    .mutation(async ({ ctx: { db, session }, input }) => {
      return db.surat.create({
        data: {
          nik: session.user.nik,
          nama: session.user.name!,
          nomorTelp: "+62" + input.telpon.toString(),
          suratId: input.suratId,
          userId: session.user.id,
        },
      });
    }),
  semuaSurat: adminProcedure.query(async ({ ctx: { db } }) => {
    return db.surat.findMany({
      include: {
        surat: true,
      },
    });
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
  tipe: protectedProcedure.query(async ({ ctx: { db } }) => {
    return db.tipe.findMany();
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
  setujuiSurat: adminProcedure
    .input(
      z.object({
        status: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db }, input: { status, id } }) => {
      return db.surat.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
    }),
});
