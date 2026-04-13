import { createTRPCRouter } from "~/server/api/trpc";
import { cardsRouter } from "~/server/api/routers/cardsRouter";

export const appRouter = createTRPCRouter({
  cards: cardsRouter,
});

export type AppRouter = typeof appRouter;
