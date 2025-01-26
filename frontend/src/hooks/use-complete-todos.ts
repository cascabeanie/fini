import { useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { completeExistingTodo } from "../api/todos-api-routes";
import { useAuthContext } from "../contexts/auth-context";
import { useTodoContext } from "../contexts/todo-context";
import { todoType } from "../lib/types/todo-types";

export default function useCompleteTodos() {
  let navigate = useNavigate();
  const { setAuthStatus } = useAuthContext();
  const { setTodos } = useTodoContext();

  const completeTodos = useCallback(
    async (todo: todoType) => {
      try {
        const { todoId } = todo;

        const data = await completeExistingTodo(todo);

        if (data?.authErrorMessage) {
          toast.error(data?.authErrorMessage);
          setAuthStatus(false);
          navigate("/login");
          return null;
        } else if (data?.errorMessage) {
          toast.error(data?.errorMessage);
          return null;
        }

        setTodos((prevTodos) => {
          const filteredTodos = prevTodos.filter((todo) => {
            return todo.todoId !== todoId;
          });

          return [...filteredTodos, data.newStatus[0]];
        });
        toast.success(data?.successMessage);
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred");
        navigate("/login");
        return null;
      }
    },
    [navigate, setTodos],
  );

  return completeTodos;
}
