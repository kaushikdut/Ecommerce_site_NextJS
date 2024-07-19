import { getUserHandler, test } from "~/server/controller/user";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  t,
} from "../trpc";

export const statusCheckRouter = createTRPCRouter({
  statuschecker: publicProcedure.query(() => {
    return {
      message: "Welcome to the trpc server!",
    };
  }),
});

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => getUserHandler({ ctx })),
  test: publicProcedure.mutation((req) => test(req)),
});
