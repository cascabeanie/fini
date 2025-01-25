import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useTodoContext } from "../contexts/todo-context";
import { useLoadingContext } from "../contexts/loading-context";
import {
  readTodos,
  createTodo,
  updateTodos,
  deleteTodo,
  completeTodo,
} from "../api/todos-api-routes";

import { todoType } from "../lib/types/todo-types";

import TodoModal from "../components/ui/modals/todo-modal";
import Button from "../components/ui/buttons/button";
import TodoList from "../components/main/todo-list";

import { CirclePlus, LoaderCircle } from "lucide-react";

export default function Home() {
  let navigate = useNavigate();

  const [newModalVisibility, setNewModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const { setTodos } = useTodoContext();
  const { loadingStatus, setLoadingStatus } = useLoadingContext();

  async function handleReadTodos() {
    try {
      setLoadingStatus(true);
      const data = await readTodos();

      console.log(data);
      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
        navigate("/login");
        return;
      }

      setTodos(() => {
        return [...data];
      });
      setLoadingStatus(false);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
      navigate("/login");
    }
  }

  async function handleCreateTodo(newTodo: todoType) {
    try {
      setLoadingStatus(true);
      const data = await createTodo(newTodo);

      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
        navigate("/login");
        return;
      }

      setTodos((prevTodos) => {
        return [...prevTodos, data.newTodo[0]];
      });
      toast.success(data?.successMessage);
      setLoadingStatus(false);
      setNewModalVisibility(false);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
      navigate("/login");
    }
  }

  async function handleUpdateTodo(newTodo: todoType) {
    try {
      setLoadingStatus(true);
      const { todoId } = newTodo;
      const data = await updateTodos(newTodo);

      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
        navigate("/login");
        return;
      }

      setTodos((prevTodos) => {
        const filteredTodos = prevTodos.filter((todo) => {
          return todo.todoId !== todoId;
        });

        return [...filteredTodos, data.updatedTodo[0]];
      });
      toast.success(data?.successMessage);
      setLoadingStatus(false);
      setEditModalVisibility(false);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
      navigate("/login");
    }
  }

  async function handleDeleteTodo(todoId: string | undefined) {
    try {
      setLoadingStatus(true);
      const data = await deleteTodo(todoId);

      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
        navigate("/login");
        return;
      }

      setTodos((prevTodos) => {
        const filteredTodos = prevTodos.filter((todo) => {
          return todo.todoId !== todoId;
        });

        return [...filteredTodos];
      });
      toast.success(data?.successMessage);
      setLoadingStatus(false);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
      navigate("/login");
    }
  }

  async function handleCompletedTodo(todo: todoType) {
    try {
      const { todoId } = todo;
      const data = await completeTodo(todo);

      if (data?.errorMessage) {
        toast.error(data?.errorMessage);
        navigate("/login");
        return;
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
    }
  }

  useEffect(() => {
    handleReadTodos();
  }, []);

  return (
    <>
      <TodoModal
        onCreateTodo={handleCreateTodo}
        modalType={"new"}
        modalStatus={newModalVisibility}
        setModalStatus={setNewModalVisibility}
      />

      <div className="flex items-center justify-start pl-4 pt-6">
        <span onClick={() => setNewModalVisibility(true)}>
          <Button
            buttonType={"button"}
            buttonVariant={"primary"}
            buttonWidth={"max-w-40"}
            disabledStatus={loadingStatus}
          >
            {loadingStatus === true ? "Loading" : "Add New"}
            {loadingStatus === true ? (
              <LoaderCircle className="animate-spin stroke-gray-500" />
            ) : (
              <CirclePlus />
            )}
          </Button>
        </span>
      </div>

      <TodoList
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
        onCompleteTodo={handleCompletedTodo}
        modalStatus={editModalVisibility}
        changeModalStatus={setEditModalVisibility}
      />
    </>
  );
}
