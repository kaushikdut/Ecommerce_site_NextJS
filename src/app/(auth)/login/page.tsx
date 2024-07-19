import Link from "next/link";
import LoginForm from "./login-form";

function Login() {
  return (
    <div className="mt-10 flex h-screen w-full flex-col items-center justify-start border">
      <div className="flex h-[530px] w-[510px] flex-col items-center justify-between rounded-3xl border border-black border-opacity-25 p-4 py-8">
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <div className="flex flex-col gap-y-2 text-center">
          <h2 className="text-xl font-medium">Welcome back to ECOMMERCE</h2>
          <h3 className="text-sm font-medium opacity-90">
            The next gen business marketplace
          </h3>
        </div>
        <LoginForm />
        <div className="flex w-full justify-center gap-x-2 pt-6 text-sm font-medium">
          <p className="text-gray-800">Don't have an Account?</p>
          <p className="fontme cursor-pointer font-semibold tracking-wider text-black hover:underline">
            <Link href={"/signup"}>SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
