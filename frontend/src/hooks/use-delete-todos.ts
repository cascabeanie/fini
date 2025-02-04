import { useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { deleteExistingTodo } from "../api/todos-api-routes";
import { useAuthContext } from "./use-auth-context";
import { useTodoContext } from "./use-todo-context";
import { useLoadingContext } from "./use-loading-context";

export default function useDeleteTodos() {
  const navigate = useNavigate();
  const { setAuthStatus } = useAuthContext();
  const { setTodos } = useTodoContext();
  const { setLoadingStatus } = useLoadingContext();

  const deleteTodos = useCallback(
    async (todoId: string | undefined) => {
      try {
        setLoadingStatus(true);
        const data = await deleteExistingTodo(todoId);

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

          return [...filteredTodos];
        });

        toast.success(data?.successMessage);
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred");
        navigate("/login");
        return null;
      } finally {
        setLoadingStatus(false);
      }
    },
    [navigate, setTodos, setAuthStatus, setLoadingStatus],
  );

  return deleteTodos;
}
