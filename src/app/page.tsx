import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Test from "./_components/test";
import { getAuthUser } from "~/server/api/getAuthUser";
import { redirect } from "next/navigation";
import { deserializeUser } from "~/server/middleware/auth";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  const user = await getAuthUser({ shouldRedirect: false });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center text-white">
        <div>{user ? redirect("/dashboard") : redirect("/signup")}</div>
      </main>
    </HydrateClient>
  );
}
