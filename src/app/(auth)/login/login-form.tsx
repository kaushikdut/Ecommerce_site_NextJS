"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import InputComponent from "~/app/_components/inputComponent";
import { api } from "~/trpc/react";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const verify = api.user.code.useMutation({
    onSuccess: (response) => {
      const { code } = response;
      console.log(response, code);
      setCookie("code", code);
    },
    onError: (err) => console.log(err),
  });

  const loginUser = api.auth.loginUser.useMutation({
    onSuccess: (response) => {
      const { token } = response;
      setCookie("token", token);
      verify.mutate();
      toast.success("success!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        toast.clearWaitingQueue();
        router.push("/verify");
      }, 4000);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSumbit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email || formData.password) {
      loginUser.mutate(formData);
    }
  };
  return (
    <form
      className="flex w-[400px] flex-col gap-y-5 border-b-2 pb-6"
      onSubmit={handleSumbit}
    >
      <div className="relative w-full gap-y-1">
        <InputComponent
          name="Email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <InputComponent
          name="Password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <button className="h-14 rounded-md bg-black text-white hover:opacity-80">
        LOGIN
      </button>
    </form>
  );
};

export default LoginForm;
