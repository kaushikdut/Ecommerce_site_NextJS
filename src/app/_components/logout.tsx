"use client";

import { getCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { array } from "zod";
import { api } from "~/trpc/react";

interface LogoutProps {
  name: string | undefined;
  user: {
    id: string;
    name?: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
const Logout = ({ name, user }: LogoutProps) => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const token = getCookie("token");
  const pathname = window.location.pathname;
  const logOut = api.auth.logoutUser.useMutation({
    onSuccess: (response) => {
      router.push("/login");
    },
    onError: (err) => console.log(err),
  });

  const updateDb = api.product.updateDb.useMutation({
    onSuccess: (response) => console.log(response),

    onError: (err) => console.log(err),
  });

  const storage = localStorage.getItem("products");

  const handleLogOut = () => {
    if (logOut) {
      logOut.mutate();

      updateDb.mutate(JSON.parse(storage ?? "Default value"));
    }
  };
  const handleMenu = () => {
    if (user) {
      setMenu((prev) => !prev);
    }
  };

  useEffect(() => {
    router.refresh();
  }, [token]);
  return (
    <>
      <p className="cursor-pointer select-none" onClick={handleMenu}>
        Hi, {name || "User"}
      </p>
      {menu && user && (
        <div className="absolute right-1 top-7 flex h-[35px] w-[7rem] select-none items-center justify-center hover:bg-neutral-100">
          <div className="cursor-pointer" onClick={handleLogOut}>
            LOGOUT
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={1}
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
    </>
  );
};
export default Logout;
