import { CornerLeftUp } from "lucide-react";

export default function EmptyTodoList() {
  return (
    <>
      <div className="m-4 flex min-h-40 items-center justify-center rounded-3xl border-2 border-gray-100">
        <h4 className="fixed left-[8.25rem] top-[10.25rem] text-gray-600">
          Why don't you add some!
        </h4>
        <CornerLeftUp
          className="fixed left-[5rem] top-[9rem] animate-pulse"
          size={40}
          stroke="gray"
        />

        <h3 className="text-xl font-medium">
          You do not have any todos yet...
        </h3>
      </div>
    </>
  );
}
