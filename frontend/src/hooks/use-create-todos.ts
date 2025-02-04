import { useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { createNewTodo } from "../api/todos-api-routes";
import { useAuthContext } from "./use-auth-context";
import { useTodoContext } from "./use-todo-context";
import { useLoadingContext } from "./use-loading-context";
import { todoType } from "../lib/types/todo-types";

export default function useCreateTodos() {
  const navigate = useNavigate();
  const { setAuthStatus } = useAuthContext();
  const { setTodos } = useTodoContext();

  const { setLoadingStatus } = useLoadingContext();

  const createTodos = useCallback(
    async (newTodo: todoType, onSuccess?: () => void) => {
      try {
        setLoadingStatus(true);
        const data = await createNewTodo(newTodo);

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
          return [...prevTodos, data.newTodo[0]];
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
    [navigate, setTodos, setAuthStatus, setLoadingStatus],
  );

  return createTodos;
}
