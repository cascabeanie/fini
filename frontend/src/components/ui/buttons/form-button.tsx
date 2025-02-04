import { useLoadingContext } from "../../../hooks/use-loading-context";
import Button from "./button";

import { CirclePlus, LoaderCircle, Pencil } from "lucide-react";

type FormButtonProps = {
  formType: "new" | "edit";
};

export default function FormButton({ formType }: FormButtonProps) {
  const { loadingStatus } = useLoadingContext();

  return (
    <>
      {formType === "new" ? (
        <span>
          <Button
            buttonType={"submit"}
            buttonVariant={"primary"}
            buttonWidth={"max-w-40"}
            disabledStatus={loadingStatus}
          >
            {loadingStatus === true ? "Adding" : "Add todo"}

            {loadingStatus === true ? (
              <LoaderCircle className="animate-spin stroke-gray-500" />
            ) : (
              <CirclePlus />
            )}
          </Button>
        </span>
      ) : (
        <span>
          <Button
            buttonType={"submit"}
            buttonVariant={"primary"}
            buttonWidth={"max-w-40"}
            disabledStatus={loadingStatus}
          >
            {loadingStatus === true ? "Editing" : "Edit todo"}

            {loadingStatus === true ? (
              <LoaderCircle className="animate-spin stroke-gray-500" />
            ) : (
              <Pencil size={18} />
            )}
          </Button>
        </span>
      )}
    </>
  );
}
