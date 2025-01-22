type SelectInputProps = {
  name: string;
  required?: boolean;
  id: string;
};

export default function SelectInput({ name, required, id }: SelectInputProps) {
  return (
    <>
      <select
        id={id}
        name={name}
        required={required}
        className="max-w-48 rounded border py-1.5 pl-2 text-sm tracking-tight shadow transition-colors hover:border-zinc-300 focus:border-zinc-500 focus:outline-none"
      >
        <option value="" hidden>
          Todo category
        </option>

        <option value="misc">Misc</option>
        <option value="work">Work</option>
        <option value="health">Health</option>
        <option value="food">Food</option>
        <option value="finance">Finance</option>
        <option value="travel">Travel</option>
        <option value="vacation">Vacation</option>
        <option value="gift">Gift</option>
        <option value="ideas">Ideas</option>
      </select>
    </>
  );
}
