"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
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
  const logOut = api.auth.logoutUser.useMutation({
    onSuccess: () => {
      deleteCookie("email");
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

      let parsedProducts: string[] = [];
      if (storage) {
        try {
          const parsed = JSON.parse(storage);
          if (
            Array.isArray(parsed) &&
            parsed.every((item) => typeof item === "string")
          ) {
            parsedProducts = parsed;
          } else {
            console.warn("Parsed storage is not of type string[]");
          }
        } catch (error) {
          console.error("Failed to parse storage:", error);
        }
      }

      updateDb.mutate(parsedProducts);
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
        Hi, {name ?? "User"}
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
