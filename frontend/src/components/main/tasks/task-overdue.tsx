import { OctagonAlert } from "lucide-react";

export default function TaskOverdue() {
  return (
    <>
      <div className="flex items-center gap-2 text-xl text-red-500">
        <OctagonAlert className="stroke-red-500" />
        <p>This task is overdue!</p>
      </div>
    </>
  );
}
