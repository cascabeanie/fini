type ButtonProps = {
  children: React.ReactNode;
  buttonVariant: "primary" | "secondary";
  buttonType: "submit" | "reset" | "button" | undefined;
  buttonWidth?: string;
  disabledStatus?: boolean;
};

export default function Button({
  children,
  buttonVariant,
  buttonType,
  buttonWidth,
  disabledStatus,
}: ButtonProps) {
  let bgColor: string | undefined;
  let textColor: string | undefined;
  let hoverBgColor: string | undefined;

  if (buttonVariant === "primary") {
    bgColor = "bg-white";
    textColor = "text-black";
    hoverBgColor = "hover:bg-custom-green";
  } else if (buttonVariant === "secondary") {
    bgColor = "bg-transparent";
    textColor = "text-black";
    hoverBgColor = "hover:bg-gray-100/30";
  }

  return (
    <>
      <button
        type={buttonType}
        className={`inline-flex h-11 w-52 items-center justify-center gap-2 rounded-md border border-gray-200 ${bgColor} px-8 py-2 text-sm font-medium ${textColor} transition-all duration-300 ${hoverBgColor} ${buttonWidth} hover:shadow-md`}
        disabled={disabledStatus}
      >
        {children}
      </button>
    </>
  );
}
