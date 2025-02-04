import { createContext, useContext } from "react";

import { todoType } from "../lib/types/todo-types";

type TodoContextType = {
  todos: todoType[];
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("TodoContext must be used within a TodoContextProvider");
  }
  return context;
}
