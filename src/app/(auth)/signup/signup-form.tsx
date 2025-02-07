"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import InputComponent from "~/app/_components/inputComponent";
import { api } from "~/trpc/react";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "cookies-next";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const signupUser = api.auth.registerUser.useMutation({
    onSuccess: (response) => {
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
      const { email } = response.data.user;
      setCookie("email", JSON.stringify(email));

      setTimeout(() => {
        toast.clearWaitingQueue();
        router.push("/login");
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
      signupUser.mutate(formData);
    }
  };

  return (
    <form className="flex w-[400px] flex-col gap-y-6" onSubmit={handleSumbit}>
      <div className="relative flex flex-col gap-y-1">
        <InputComponent
          name="Name"
          type="text"
          onChange={handleChange}
          value={formData.name}
        />
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

      <button className="h-14 rounded-md bg-black text-sm font-medium tracking-wider text-slate-100 hover:opacity-80">
        CREATE ACCOUNT
      </button>
    </form>
  );
}

export default SignupForm;
