import Button from "../../ui/buttons/button";
import AuthInput from "../../ui/inputs/auth-inputs";

import { ClipboardCheck } from "lucide-react";

export default function Login() {
  function handleSubmit() {
    console.log("test123");
  }

  return (
    <>
      <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-8 px-4">
        <h2 className="flex items-center gap-2 text-2xl font-medium tracking-tight">
          Login to manage your tasks
          <ClipboardCheck className="stroke-gray-500" />
        </h2>

        <div className="flex h-full max-h-[22rem] w-full max-w-md flex-col items-center gap-8 rounded-3xl border p-6 shadow-lg md:max-h-[26rem] md:max-w-xl md:gap-10 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-6 md:gap-8"
          >
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="username">Username</label>
              <AuthInput
                inputType={"text"}
                name={"username"}
                placeholder={"Enter your username"}
                required={true}
                minimumLength={8}
                id={"username"}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password">Password</label>
              <AuthInput
                inputType={"password"}
                autocompleteType={"current-password"}
                name={"password"}
                placeholder={"Enter your password"}
                required={true}
                minimumLength={8}
                id={"password"}
              />
            </div>

            <div className="w-full">
              <Button
                buttonVariant={"primary"}
                buttonType={"submit"}
                buttonWidth={"w-full"}
              >
                Login
              </Button>
            </div>
          </form>

          <div className="flex gap-1">
            <p className="text-gray-500">Do not have an account yet?</p>
            <button className="underline underline-offset-4 hover:animate-pulse">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
