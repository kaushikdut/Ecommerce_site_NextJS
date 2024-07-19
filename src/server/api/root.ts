import { postRouter } from "~/server/api/routers/post";
import {
  createCallerFactory,
  createContext,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  t,
} from "~/server/api/trpc";
import authRouter from "./routers/auth";
import { statusCheckRouter, userRouter } from "./routers/user";
import { getUserHandler, test } from "../controller/user";
import { createUserSchema } from "libs/user-schema";
import { loginHandler, registerHandler } from "../controller/auth";
import { productRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  status: statusCheckRouter,
  user: userRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};
