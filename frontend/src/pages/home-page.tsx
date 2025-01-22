import { useState, useEffect } from "react";
import { useTodoContext } from "../contexts/todo-context";
import { useLoadingContext } from "../contexts/loading-context";
import { readTodos, createTodo, deleteTodo } from "../api/todos-api-routes";

import { todoType } from "../lib/types/todo-types";

import TodoModal from "../components/ui/modals/todo-modal";
import Button from "../components/ui/buttons/button";

import { CirclePlus, LoaderCircle } from "lucide-react";
import TodoList from "../components/main/todo-list";

export default function Home() {
  const [newModalVisibility, setNewModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const { setTodos } = useTodoContext();
  const { loadingStatus, setLoadingStatus } = useLoadingContext();

  useEffect(() => {
    async function handleReadTodos() {
      setLoadingStatus(true);
      const data = await readTodos();
      setTodos(() => {
        return [...data];
      });
      setLoadingStatus(false);
    }
    handleReadTodos();
  }, []);

  async function handleCreateTodo(newTodo: todoType) {
    setLoadingStatus(true);
    const data = await createTodo(newTodo);
    setTodos((prevTodos) => {
      return [...prevTodos, data[0]];
    });
    setLoadingStatus(false);
    setNewModalVisibility(false);
  }

  async function handleUpdateTodo(newTodo: todoType) {}

  async function handleDeleteTodo(todoId: string | undefined) {
    setLoadingStatus(true);
    await deleteTodo(todoId);

    setTodos((prevTodos) => {
      const filteredTodos = prevTodos.filter((todo) => {
        return todo.todoId !== todoId;
      });

      return [...filteredTodos];
    });
    setLoadingStatus(false);
  }

  async function handleCompletedTodo(todo: todoType) {}

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
