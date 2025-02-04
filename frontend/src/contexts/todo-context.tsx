import { useState } from "react";
import { TodoContext } from "../hooks/use-todo-context";

import { todoType } from "../lib/types/todo-types";

type TodoContextProviderProps = {
  children: React.ReactNode;
};

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
