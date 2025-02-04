import { Link } from "react-router";

import LandingList from "../components/main/landing/landing-list";
import Button from "../components/ui/buttons/button";

import { useAuthContext } from "../hooks/use-auth-context";

export default function Landing() {
  const { authStatus } = useAuthContext();

  return (
    <>
      <div className="flex min-h-full min-w-full flex-col items-center gap-6 sm:gap-10">
        <div className="mt-14 flex flex-col items-center gap-8">
          <span className="flex flex-col gap-1 text-center font-['Marcellus'] text-3xl font-medium sm:text-5xl">
            <h2>Manage your tasks with</h2>
            <h2 className="font-['IM_Fell_French_Canon'] text-4xl font-semibold sm:text-6xl">
              fini
            </h2>
          </span>

          <span className="px-2 text-center font-['Marcellus'] text-lg text-gray-600 sm:text-xl">
            <p>Keep track of your tasks, notes, and deadlines</p>
          </span>

          <span>
            {authStatus === true ? (
              <Link to="/tasks">
                <Button buttonType={"button"} buttonVariant={"primary"}>
                  Manage Tasks
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button buttonType={"button"} buttonVariant={"primary"}>
                  Get Started
                </Button>
              </Link>
            )}
          </span>
        </div>

        <div className="flex w-full justify-center bg-gray-100/20">
          <LandingList />
        </div>
      </div>
    </>
  );
}
