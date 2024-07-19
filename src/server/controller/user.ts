import { Context } from "../api/trpc";
import { TRPCError } from "@trpc/server";

export const getUserHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    return {
      status: "success",
      data: {
        user,
        ctx,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const test = async (req: any) => {
  const found = req;
  return { found, message: "successful" };
};
