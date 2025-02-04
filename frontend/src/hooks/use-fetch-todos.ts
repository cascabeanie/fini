import { useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { readAllTodos } from "../api/todos-api-routes";
import { useAuthContext } from "./use-auth-context";
import { useTodoContext } from "./use-todo-context";
import { useLoadingContext } from "./use-loading-context";

export default function useFetchTodos() {
  const navigate = useNavigate();
  const { setAuthStatus } = useAuthContext();
  const { setTodos } = useTodoContext();
  const { setLoadingStatus } = useLoadingContext();

  const fetchTodos = useCallback(async () => {
    try {
      setLoadingStatus(true);
      const data = await readAllTodos();

      if (data?.authErrorMessage) {
        toast.error(data?.authErrorMessage);
        setAuthStatus(false);
        navigate("/login");
        return;
      } else if (data?.errorMessage) {
        toast.error(data?.errorMessage);
        return [];
      }

      setTodos(() => {
        return [...data];
      });
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
      navigate("/login");
      return [];
    } finally {
      setLoadingStatus(false);
    }
  }, [navigate, setTodos, setAuthStatus, setLoadingStatus]);

  return fetchTodos;
}
