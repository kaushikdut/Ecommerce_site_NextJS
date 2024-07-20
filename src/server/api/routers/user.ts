import { getUserHandler, verificationCode } from "~/server/controller/user";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  t,
} from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => getUserHandler({ ctx })),
  code: publicProcedure.mutation(async () => verificationCode()),
});
