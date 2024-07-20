import { cookies } from "next/headers";
import { Context } from "../api/trpc";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { EmailTemplate } from "~/app/_components/email-form";

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

export const verificationCode = async () => {
  const code = Math.floor((Math.random() + 9) * 10000000);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "duttakoushik779@gmail.com",
    subject: "Verification Code",
    react: EmailTemplate({ code }),
  });

  return {
    code,
    data,
    error,
  };
};
