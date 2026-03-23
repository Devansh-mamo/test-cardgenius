import { createServerSideHelpers } from '@trpc/react-query/server';
import { prisma } from "~/server/db";
import { appRouter } from '../api/root';
import superjson from "superjson";


export const generateSSGHelper = () =>
createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: superjson, // optional - adds superjson serialization
  });

// const helpers = createServerSideHelpers({
//   router: appRouter,
//   ctx: await createContext(),
//   transformer: superjson, // optional - adds superjson serialization
// });