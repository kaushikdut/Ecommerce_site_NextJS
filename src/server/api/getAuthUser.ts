"use server";
import { redirect } from "next/navigation";
import { createAsyncCaller } from "./root";

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
      if (e.code === "UNAUTHORIZED" && shouldRedirect) {
        redirect("/login");
      }

      return null;
    });
};
