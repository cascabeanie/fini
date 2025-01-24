import NavButton from "../ui/buttons/nav-button";

import { CircleCheckBig, LogOut } from "lucide-react";

export default function Navbar() {
  // using useLocation() from react router obtain the current path and conditionally render the nav buttons based on the result
  return (
    <>
      <nav className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2">
          <CircleCheckBig />
          <h1 className="font-['IM_Fell_French_Canon'] text-2xl font-bold">
            fini
          </h1>
        </span>

        <span className="group">
          <NavButton buttonType={"button"}>
            <LogOut className="stroke-gray-500 group-hover:stroke-gray-700" />
            Log out
          </NavButton>
        </span>
      </nav>
    </>
  );
}
