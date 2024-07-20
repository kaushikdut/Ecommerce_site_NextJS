import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "../db";

export const deserializeUser = async () => {
  const cookieStore = cookies();
  try {
    let token;
    if (cookieStore.get("token")) {
      token = cookieStore.get("token")?.value;
    }
    const notAuthenticated = {
      user: null,
    };

    if (!token) {
      return notAuthenticated;
    }
    const secret = process.env.JWT_SECRET!;

    let decoded;
    try {
      decoded = jwt.verify(token, secret) as { sub: string };
    } catch (verifyError) {
      if (verifyError.name === "TokenExpiredError") {
        console.error("JWT has expired", verifyError);
        return notAuthenticated; // or handle differently, e.g., redirect to login
      }
      console.error("JWT verification failed", verifyError);
      return notAuthenticated;
    }

    if (!decoded) {
      return notAuthenticated;
    }

    const user = await db.user.findUnique({ where: { id: decoded.sub } });

    if (!user) {
      return notAuthenticated;
    }

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
