import { useState } from "react";
import { useTodoContext } from "../../contexts/todo-context";
import { useLoadingContext } from "../../contexts/loading-context";
import {
  getCategoryColour,
  getPriorityColour,
} from "../../utils/get-todo-colour-helpers.ts";

import { todoType } from "../../lib/types/todo-types";

import TodoModal from "../ui/modals/todo-modal";
import Button from "../ui/buttons/button";
import CompletedCheckboxInput from "../ui/inputs/completed-checkbox-input";
import EmptyTodoList from "./empty-todo-list.tsx";
import LoadingTodoList from "./loading-todo-list.tsx";

import { Flag, Pencil, Trash2 } from "lucide-react";

type TodoListProps = {
  onUpdateTodo: (newTodo: todoType) => void;
  onDeleteTodo: (todoId: string | undefined) => void;
  onCompleteTodo: (newTodo: todoType) => void;
  modalStatus: boolean;
  changeModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TodoList({
  onUpdateTodo,
  onDeleteTodo,
  onCompleteTodo,
  modalStatus,
  changeModalStatus,
}: TodoListProps) {
  const [selectedTodoId, setSelectedTodoId] = useState<string | undefined>();
  const { todos } = useTodoContext();
  const { loadingStatus } = useLoadingContext();

  return (
    <>
      <TodoModal
        onUpdateTodo={onUpdateTodo}
        selectedTodoId={selectedTodoId}
        modalType={"edit"}
        modalStatus={modalStatus}
        setModalStatus={changeModalStatus}
      />

      {loadingStatus === true ? (
        <LoadingTodoList />
      ) : todos.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <div className="m-4 flex rounded-3xl border-2 border-gray-100">
          <ul className="m-4 grid w-full grid-rows-[repeat(auto)] gap-8">
            {todos.map((todo: todoType) => (
              <li
                key={todo.todoId}
                className="flex flex-col gap-4 p-2 shadow-sm"
              >
                <div className="grid grid-rows-4 items-center gap-1 md:grid-cols-[repeat(3,_1fr),_auto] md:grid-rows-1">
                  <div className="flex items-center justify-start gap-4 md:gap-8">
                    <span
                      className="flex"
                      onChange={() => {
                        onCompleteTodo(todo);
                      }}
                    >
                      <CompletedCheckboxInput
                        name="todoCompleted"
                        isCompleted={todo.todoCompleted}
                      />
                    </span>
                    <h4 className="text-xl font-medium">{todo.todoTitle}</h4>
                    <Flag stroke={`${getPriorityColour(todo.todoPriority)}`} />
                  </div>

                  <div className="flex md:justify-center">
                    <span
                      className={`max-w-fit rounded-3xl px-4 ${getCategoryColour(todo.todoCategory)}`}
                    >
                      <h3>{todo.todoCategory}</h3>
                    </span>
                  </div>

                  <div className="flex md:justify-center">
                    <time className="font-light">
                      Deadline: {todo.todoDeadline}
                    </time>
                  </div>

                  <div className="flex gap-4 md:justify-center">
                    <div
                      className="group"
                      onClick={() => {
                        setSelectedTodoId(todo.todoId);
                        changeModalStatus(true);
                      }}
                    >
                      <Button
                        buttonType={"button"}
                        buttonVariant={"secondary"}
                        buttonWidth={"max-w-24"}
                      >
                        <Pencil className="transition-colors group-hover:stroke-custom-green" />
                      </Button>
                    </div>
                    <div
                      className="group"
                      onClick={() => {
                        onDeleteTodo(todo.todoId);
                      }}
                    >
                      <Button
                        buttonType={"button"}
                        buttonVariant={"secondary"}
                        buttonWidth={"max-w-24"}
                        disabledStatus={loadingStatus}
                      >
                        <Trash2 className="transition-colors group-hover:stroke-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Notes:</h3>
                  <p className="font-light">{todo.todoNotes}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
