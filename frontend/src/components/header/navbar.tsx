import { useEffect } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/auth-context";
import { verifyUser } from "../../api/auth-api-routes";

import NavButton from "../ui/buttons/nav-button";

import { CircleCheckBig, LogIn, LogOut, SquarePen } from "lucide-react";

export default function Navbar() {
  let navigate = useNavigate();
  const { authStatus, setAuthStatus } = useAuthContext();

  async function handleVerifyUser() {
    try {
      const data = await verifyUser();

      if (data?.authErrorMessage) {
        setAuthStatus(false);
        return;
      } else if (data?.authSuccessMessage) {
        setAuthStatus(true);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleVerifyUser();
  }, []);

  return (
    <>
      <nav className="flex w-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CircleCheckBig />
          <h1 className="font-['IM_Fell_French_Canon'] text-2xl font-bold">
            fini
          </h1>
        </Link>

        <span className="group">
          {authStatus === true ? (
            <span
              onClick={() => {
                localStorage.removeItem("token");
                setAuthStatus(false);
                toast.info("You have been logged out. Bye!");
                navigate("/");
              }}
            >
              <NavButton buttonType={"button"}>
                <LogOut className="stroke-gray-500 group-hover:stroke-gray-700" />
                Log out
              </NavButton>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Link to="/register">
                <NavButton buttonType={"button"}>
                  <SquarePen className="stroke-gray-500 group-hover:stroke-gray-700" />
                  Register
                </NavButton>
              </Link>

              <Link to="/login">
                <NavButton buttonType={"button"}>
                  <LogIn className="stroke-gray-500 group-hover:stroke-gray-700" />
                  Log in
                </NavButton>
              </Link>
            </span>
          )}
        </span>
      </nav>
    </>
  );
}
