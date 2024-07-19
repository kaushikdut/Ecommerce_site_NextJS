"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import InputComponent from "~/app/_components/inputComponent";
import { api } from "~/trpc/react";
import { setCookie } from "cookies-next";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const loginUser = api.auth.loginUser.useMutation({
    onSuccess: (response) => {
      // router.push("/");
      console.log(response);
      const { token } = response;
      setCookie("token", token);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { type, value } = e.target;
    setFormData((prev) => ({ ...prev, [type]: value }));
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
