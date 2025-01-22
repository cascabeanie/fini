import { todoType } from "../lib/types/todo-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Get todos for a specific user
export async function readTodos() {
  try {
    // dev: user_id will be provided in a jwt when implemented later
    const res = await fetch(`${baseUrl}todos`, {
      method: "GET",
      headers: {
        "user-id": "1",
      },
    });
    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Create a todo for a specific user
export async function createTodo(newTodo: todoType) {
  try {
    const res = await fetch(`${baseUrl}todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": "1",
      },
      body: JSON.stringify({
        todo_category: newTodo.todoCategory,
        todo_title: newTodo.todoTitle,
        todo_notes: newTodo.todoNotes,
        todo_deadline: newTodo.todoDeadline,
        todo_priority: newTodo.todoPriority,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
