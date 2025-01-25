import { todoType } from "../lib/types/todo-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Get todos for a specific user
export async function readTodos() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/api/todos`, {
    method: "GET",
    headers: {
      authorization: token as string,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  // dev: for testing
  console.log(data);
  return data;
}

// Create a todo for a specific user
export async function createTodo(newTodo: todoType) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token as string,
    },
    body: JSON.stringify({
      todo_category: newTodo.todoCategory,
      todo_title: newTodo.todoTitle,
      todo_notes: newTodo.todoNotes,
      todo_deadline: newTodo.todoDeadline,
      todo_priority: newTodo.todoPriority,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  return data;
}

// Update a todo for a specific user
export async function updateTodos(newTodo: todoType) {
  const { todoId } = newTodo;
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/api/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token as string,
    },
    body: JSON.stringify({
      todo_category: newTodo.todoCategory,
      todo_title: newTodo.todoTitle,
      todo_notes: newTodo.todoNotes,
      todo_deadline: newTodo.todoDeadline,
      todo_priority: newTodo.todoPriority,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  return data;
}

// Delete a todo for a specific user
export async function deleteTodo(todoId: string | undefined) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/api/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      authorization: token as string,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  return data;
}

// Update the completed status of a todo for a specific user
export async function completeTodo(todo: todoType) {
  let newCompletedStatus;
  const { todoId, todoCompleted } = todo;
  const token = localStorage.getItem("token");

  todoCompleted === false
    ? (newCompletedStatus = true)
    : (newCompletedStatus = false);

  const res = await fetch(`${baseUrl}/api/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token as string,
    },
    body: JSON.stringify({
      todo_completed: newCompletedStatus,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  const data = await res.json();
  return data;
}
