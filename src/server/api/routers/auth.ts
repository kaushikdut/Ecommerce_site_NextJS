import { createUserSchema, loginUserSchema } from "libs/user-schema";
import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "~/server/controller/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input }) => loginHandler({ input })),
  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
