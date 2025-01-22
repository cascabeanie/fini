type NavButtonProps = {
  children: React.ReactNode;
  buttonType: "submit" | "reset" | "button" | undefined;
  disabledStatus?: boolean;
};

export default function NavButton({
  children,
  buttonType,
  disabledStatus,
}: NavButtonProps) {
  return (
    <>
      <button
        type={buttonType}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-3xl border border-gray-200 bg-transparent px-3 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-gray-100/30 hover:shadow-md md:px-6`}
        disabled={disabledStatus}
      >
        {children}
      </button>
    </>
  );
}
