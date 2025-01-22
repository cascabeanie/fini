type CompletedCheckboxInputProps = {
  name: string;
  isCompleted: boolean | undefined;
};

export default function CompletedCheckboxInput({
  name,
  isCompleted,
}: CompletedCheckboxInputProps) {
  return (
    <>
      <input
        type="checkbox"
        defaultChecked={isCompleted}
        name={name}
        className="h-5 w-5 cursor-pointer accent-custom-green"
      />
    </>
  );
}
