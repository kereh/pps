import { createTRPCRouter } from "@/server/api/trpc";
import { autentikasiRouter } from "@/server/api/routers/autentikasi";
import { suratRouter } from "@/server/api/routers/surat";
import { usersRouter } from "@/server/api/routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  autentikasi: autentikasiRouter,
  surat: suratRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
