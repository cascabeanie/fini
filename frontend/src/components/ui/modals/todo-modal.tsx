import { useEffect, useRef } from "react";

import { todoType } from "../../../lib/types/todo-types";

import TodoForm from "../../main/tasks/todo-form";

import { CircleX } from "lucide-react";

type TodoModalProps = {
  onCreateTodo?: (newTodo: todoType) => void;
  onUpdateTodo?: (newTodo: todoType) => void;
  selectedTodoId?: string | undefined;
  modalType: "new" | "edit";
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TodoModal({
  onCreateTodo,
  onUpdateTodo,
  selectedTodoId,
  modalType,
  modalStatus,
  setModalStatus,
}: TodoModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalStatus) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modalStatus]);

  return (
    <>
      <dialog
        ref={modalRef}
        onCancel={() => {
          setModalStatus(false);
        }}
        className="rounded-3xl border-2 shadow-lg backdrop:bg-white/70"
      >
        <div className="border-3 flex flex-col">
          <div className="flex justify-end p-4">
            <CircleX
              className="cursor-pointer transition-colors duration-300 hover:stroke-red-500"
              onClick={() => {
                setModalStatus(false);
              }}
            />
          </div>

          <TodoForm
            onCreateTodo={onCreateTodo}
            onUpdateTodo={onUpdateTodo}
            selectedTodoId={selectedTodoId}
            modalType={modalType}
          />
        </div>
      </dialog>
    </>
  );
}
