import { useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { updateExistingTodo } from "../api/todos-api-routes";
import { useAuthContext } from "../contexts/auth-context";
import { useTodoContext } from "../contexts/todo-context";
import { useLoadingContext } from "../contexts/loading-context";
import { todoType } from "../lib/types/todo-types";

export default function useUpdateTodos() {
  let navigate = useNavigate();
  const { setAuthStatus } = useAuthContext();
  const { setTodos } = useTodoContext();
  const { setLoadingStatus } = useLoadingContext();

  const updateTodos = useCallback(
    async (newTodo: todoType, onSuccess?: () => void) => {
      try {
        setLoadingStatus(true);
        const { todoId } = newTodo;
        const data = await updateExistingTodo(newTodo);

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

          return [...filteredTodos, data.updatedTodo[0]];
        });

        toast.success(data?.successMessage);
        onSuccess?.();
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred");
        navigate("/login");
        return null;
      } finally {
        setLoadingStatus(false);
      }
    },
    [navigate, setTodos, setLoadingStatus],
  );

  return updateTodos;
}
