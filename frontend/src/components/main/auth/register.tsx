import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../../../api/auth-api-routes";

import Button from "../../ui/buttons/button";
import AuthInput from "../../ui/inputs/auth-inputs";

import { ClipboardCheck } from "lucide-react";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const formData = new FormData(event.currentTarget);

      const userCredentials = {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      };

      const data = await registerUser(userCredentials);

      if (data && data.token) {
        // dev: for testing
        console.log(data);

        localStorage.setItem("token", data.token);
        navigate("/tasks");
      } else {
        setError(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-8 px-4">
        <h2 className="flex items-center gap-2 text-2xl font-medium tracking-tight">
          Join to manage your tasks
          <ClipboardCheck className="stroke-gray-500" />
        </h2>

        <div className="flex h-full max-h-[28rem] w-full max-w-md flex-col items-center gap-8 rounded-3xl border p-6 shadow-lg md:max-h-[30rem] md:max-w-xl md:gap-10 md:p-12">
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
              <p className="tracking-tight text-gray-500">
                Should contain at least 8 characters and no sensitive
                information
              </p>
            </div>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password">Password</label>
              <AuthInput
                inputType={"password"}
                autocompleteType={"new-password"}
                name={"password"}
                placeholder={"Enter your password"}
                required={true}
                minimumLength={8}
                id={"password"}
              />

              <p className="tracking-tight text-gray-500">
                Should contain at least 8 characters
              </p>
            </div>

            <div className="w-full">
              {error && <div className="text-red-600">{error}</div>}

              <Button
                buttonVariant={"primary"}
                buttonType={"submit"}
                buttonWidth={"w-full"}
              >
                Register
              </Button>
            </div>
          </form>

          <div className="flex gap-1">
            <p className="text-gray-500">Already have an account?</p>
            <Link
              to="/login"
              className="underline underline-offset-4 hover:animate-pulse"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
