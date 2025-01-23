import Login from "../components/main/auth/login";
import Register from "../components/main/auth/register";

export default function Auth() {
  return (
    <>
      <div className="flex min-h-full min-w-full">
        {false ? <Login /> : <Register />}
      </div>
    </>
  );
}
