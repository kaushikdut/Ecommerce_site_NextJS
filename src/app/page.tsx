import { getAuthUser } from "~/server/api/getAuthUser";
import { redirect } from "next/navigation";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  const user = await getAuthUser({ shouldRedirect: false });

  user ? redirect("/dashboard") : redirect("/signup");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div></div>
    </main>
  );
}
