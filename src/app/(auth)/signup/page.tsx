import Link from "next/link";
import SignupForm from "./signup-form";

function Signup() {
  return (
    <div className="mt-10 flex h-screen w-full items-start justify-center">
      <div className="flex h-auto w-[510px] flex-col items-center justify-between gap-y-8 rounded-3xl border border-black border-opacity-20 p-4 py-8 outline-none">
        <div>
          <h1 className="text-3xl font-semibold">Create your account</h1>
        </div>
        <SignupForm />
        <div className="mb-10 flex gap-x-2">
          <p>Have an account?</p>
          <p className="text-md cursor-pointer font-medium tracking-wider hover:underline">
            <Link href={"/login"}>LOGIN</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
