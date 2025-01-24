import { Outlet } from "react-router";

export default function Auth() {
  return (
    <>
      <div className="flex min-h-full min-w-full">
        <Outlet />
      </div>
    </>
  );
}
