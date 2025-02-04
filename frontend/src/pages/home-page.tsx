import { useState, useEffect } from "react";
import useFetchTodos from "../hooks/use-fetch-todos";
import useCreateTodos from "../hooks/use-create-todos";
import useUpdateTodos from "../hooks/use-update-todos";
import useDeleteTodos from "../hooks/use-delete-todos";
import useCompleteTodos from "../hooks/use-complete-todos";
import { useLoadingContext } from "../hooks/use-loading-context";
import { todoType } from "../lib/types/todo-types";

import TodoModal from "../components/ui/modals/todo-modal";
import Button from "../components/ui/buttons/button";
import TodoList from "../components/main/tasks/todo-list";

import { CirclePlus, LoaderCircle } from "lucide-react";

export default function Home() {
  const [newModalVisibility, setNewModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const { loadingStatus } = useLoadingContext();
  const fetchTodos = useFetchTodos();
  const createTodos = useCreateTodos();
  const updateTodos = useUpdateTodos();
  const deleteTodos = useDeleteTodos();
  const completeTodos = useCompleteTodos();

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Handler for creating a new todo
  async function handleCreateTodo(newTodo: todoType) {
    await createTodos(newTodo, () => {
      setNewModalVisibility(false);
    });
  }

  // Handler for updating a todo
  async function handleUpdateTodo(updatedTodo: todoType) {
    await updateTodos(updatedTodo, () => {
      setEditModalVisibility(false);
    });
  }

  // Handler for deleting a todo
  async function handleDeleteTodo(todoId: string | undefined) {
    await deleteTodos(todoId);
  }

  // Handler for completing a todo
  async function handleCompletedTodo(todo: todoType) {
    await completeTodos(todo);
  }

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
