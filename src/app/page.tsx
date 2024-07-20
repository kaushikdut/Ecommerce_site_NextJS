import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Test from "./_components/test";
import { getAuthUser } from "~/server/api/getAuthUser";
import { redirect } from "next/navigation";
import Signup from "./(auth)/signup/page";
import Login from "./(auth)/login/page";
import { Bounce, ToastContainer } from "react-toastify";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  const user = await getAuthUser({ shouldRedirect: false });

  user ? redirect("/dashboard") : redirect("/signup");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div></div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </main>
  );
}
