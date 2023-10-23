import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { registerSchema } from "@/schemas/register"

export const autentikasiRouter = createTRPCRouter({
  registrasi: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          username: input.username,
          password: input.password
        }
      })
    })
})