import { Link } from "react-router";

import NavButton from "../ui/buttons/nav-button";

import { CircleCheckBig, LogOut } from "lucide-react";

export default function Navbar() {
  // If token in localstorage then render logout button only in nav else render register and login buttons in nav

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
          <NavButton buttonType={"button"}>
            <LogOut className="stroke-gray-500 group-hover:stroke-gray-700" />
            Log out
          </NavButton>
        </span>
      </nav>
    </>
  );
}
