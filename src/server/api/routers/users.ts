import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  semuaUser: adminProcedure.query(async ({ ctx: { db } }) => {
    return db.user.findMany({
      where: {
        role: "USER",
      },
    });
  }),
  hapusUser: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { db }, input }) => {
      return db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
