import { CircleCheckBig, LogOut } from "lucide-react";
import Button from "../ui/buttons/button";

export default function Navbar() {
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
          <Button
            buttonVariant={"secondary"}
            buttonType={"button"}
            buttonWidth={"max-w-40"}
          >
            <LogOut className="stroke-gray-500 group-hover:stroke-gray-700" />
            Log out
          </Button>
        </span>
      </nav>
    </>
  );
}
