"use server";
import { redirect } from "next/navigation";
import { createAsyncCaller } from "./root";

interface UnauthorizedError extends Error {
  code: string;
}

function isUnauthorizedError(error: unknown): error is UnauthorizedError {
  return typeof error === "object" && error !== null && "code" in error;
}

export const getAuthUser = async ({
  shouldRedirect = true,
}: {
  shouldRedirect?: boolean;
} = {}) => {
  const caller = await createAsyncCaller();
  return caller.user
    .getUser(undefined)
    .then((result) => result.data.user)
    .catch((e) => {
      if (
        isUnauthorizedError(e) &&
        e.code === "UNAUTHORIZED" &&
        shouldRedirect
      ) {
        redirect("/login");
      }

      return null;
    });
};
