import { createContext, useContext, useState } from "react";

import { todoType } from "../lib/types/todo-types";

type TodoContextProviderProps = {
  children: React.ReactNode;
};

type TodoContextType = {
  todos: todoType[];
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export default function TodoContextProvider({
  children,
}: TodoContextProviderProps) {
  const [todos, setTodos] = useState<todoType[]>([]);

  return (
    <>
      <TodoContext.Provider value={{ todos, setTodos }}>
        {children}
      </TodoContext.Provider>
    </>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("TodoContext must be used within a TodoContextProvider");
  }
  return context;
}
