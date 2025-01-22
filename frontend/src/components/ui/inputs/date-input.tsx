type DateInputProps = {
  name: string;
  defaultValue: string;
  min: string;
  required?: boolean;
  id: string;
};

export default function DateInput({
  name,
  defaultValue,
  min,
  required,
  id,
}: DateInputProps) {
  return (
    <>
      <input
        id={id}
        type="datetime-local"
        name={name}
        defaultValue={defaultValue}
        min={min}
        required={required}
        className="max-w-48 rounded border py-1.5 pl-2 text-sm tracking-tight shadow transition-colors hover:border-zinc-300 focus:border-zinc-500 focus:outline-none"
      />
    </>
  );
}
