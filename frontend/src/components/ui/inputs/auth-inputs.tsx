type AuthInputProps = {
  inputType: string;
  autocompleteType?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minimumLength?: number;
  id: string;
};

export default function AuthInput({
  inputType,
  autocompleteType,
  name,
  placeholder,
  required,
  minimumLength,
  id,
}: AuthInputProps) {
  return (
    <>
      <input
        id={id}
        type={inputType}
        autoComplete={autocompleteType}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minimumLength}
        maxLength={255}
        className="text-md h-10 w-full rounded border py-1.5 pl-2 tracking-tight shadow transition-colors hover:border-zinc-300 focus:border-zinc-500 focus:outline-none"
      />
    </>
  );
}
