import CompletedCheckboxInput from "../../ui/inputs/completed-checkbox-input";
import Button from "../../ui/buttons/button";

import { Flag, Pencil, Trash2 } from "lucide-react";

type LandingItemProps = {
  ItemCompleted: boolean;
  Itemtitle: string;
  ItemPriority: string;
  ItemCategory: string;
  ItemCategoryColour: string;
  ItemDeadline: string;
  ItemNotes: string;
};

export default function LandingItem({
  ItemCompleted,
  Itemtitle,
  ItemPriority,
  ItemCategory,
  ItemCategoryColour,
  ItemDeadline,
  ItemNotes,
}: LandingItemProps) {
  return (
    <>
      <li className="flex flex-col gap-4 p-2 shadow-sm">
        <div className="grid grid-rows-4 items-center gap-1 md:grid-cols-[repeat(3,_1fr)_auto] md:grid-rows-1">
          <div className="flex items-center justify-start gap-4 md:gap-8">
            <span className="flex">
              <CompletedCheckboxInput
                name="todoCompleted"
                isCompleted={ItemCompleted}
              />
            </span>
            <h4 className="text-xl font-medium">{Itemtitle}</h4>
            <Flag stroke={ItemPriority} />
          </div>

          <div className="flex md:justify-center">
            <span
              className={`max-w-fit rounded-3xl ${ItemCategoryColour} px-4`}
            >
              <h3>{ItemCategory}</h3>
            </span>
          </div>

          <div className="flex md:justify-center">
            <time className="font-light">Deadline: {ItemDeadline}</time>
          </div>

          <div className="flex gap-4 md:justify-center">
            <div className="group">
              <Button
                buttonType={"button"}
                buttonVariant={"secondary"}
                buttonWidth={"max-w-24"}
                disabledStatus={true}
              >
                <Pencil className="transition-colors group-hover:stroke-custom-green" />
              </Button>
            </div>
            <div className="group">
              <Button
                buttonType={"button"}
                buttonVariant={"secondary"}
                buttonWidth={"max-w-24"}
                disabledStatus={true}
              >
                <Trash2 className="transition-colors group-hover:stroke-red-500" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium">Notes: </h3>
          <p className="font-light">{ItemNotes}</p>
        </div>
      </li>
    </>
  );
}
