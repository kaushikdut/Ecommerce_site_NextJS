"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Verify() {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const inputRefs = useRef<HTMLInputElement>(null);
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const email = getCookie("email");
  const verifyCode = getCookie("code");
  const router = useRouter();

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const { value } = target;
    if (isNaN(Number(value))) return;

    const newOtp: string[] = [...otp];
    newOtp[i] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (!value) {
      setActiveOtpIndex(Math.max(i - 1, 0));
    } else {
      setActiveOtpIndex(Math.min(i + 1, otp.length - 1));
    }
  };

  const handleKeydown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    if (key === "Backspace" && !inputRefs.current?.value) {
      setActiveOtpIndex(i - 1);
    }
  };

  useEffect(() => {
    inputRefs.current?.focus();
  }, [activeOtpIndex]);

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newOtp = otp.join("");
    if (newOtp === verifyCode) {
      toast.success("Verified!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      deleteCookie("code");
      setTimeout(() => router.push("/dashboard"), 3000);
    }
    toast.clearWaitingQueue();
  };

  return (
    <div className="h-100% flex w-full items-start justify-center">
      <div className="mt-8 flex h-auto w-[510px] flex-col items-center gap-y-5 rounded-xl border border-black border-opacity-25 py-8">
        <h1 className="text-3xl font-semibold">Verify your email</h1>
        <div className="text-center">
          <p>Enter the 8 digit code you have received on </p>
          <p className="text-sm font-semibold">{email}</p>
          <p className="text-sm font-semibold">{verifyCode}</p>
        </div>

        <form
          className="flex w-[410px] flex-col gap-y-3 px-3"
          onSubmit={handleSumbit}
        >
          <p>Code</p>
          <div className="mb-10 flex h-full w-full justify-center gap-x-2">
            {otp?.map((code, i) => (
              <input
                ref={i === activeOtpIndex ? inputRefs : null}
                key={i}
                maxLength={1}
                type="text"
                className="h-[42px] w-[42px] rounded-md border border-black border-opacity-25 text-center outline-none"
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeydown(e, i)}
                value={code || ""}
                onClick={() => setActiveOtpIndex(i)}
              />
            ))}
          </div>
          <button className="mb-5 h-14 rounded-md bg-black text-white hover:opacity-80">
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify;
