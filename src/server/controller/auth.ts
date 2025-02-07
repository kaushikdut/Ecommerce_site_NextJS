import { TRPCError } from "@trpc/server";
import { CreateUserInput, LoginUserInput } from "libs/user-schema";
import { db } from "../db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = await db.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return {
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (err) {
    throw err;
  }
};

export const loginHandler = async ({ input }: { input: LoginUserInput }) => {
  try {
    const user = await db.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: 60 * 60,
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
    };
    cookies().set("token", token, cookieOptions);

    return {
      status: "success",
      token,
    };
  } catch (err) {
    throw err;
  }
};

export const logoutHandler = async () => {
  try {
    cookies().set("token", "", {
      maxAge: -1,
    });
    return { status: "success" };
  } catch (err) {
    throw err;
  }
};
