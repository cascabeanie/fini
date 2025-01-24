import { todoType } from "../lib/types/todo-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Get todos for a specific user
export async function readTodos() {
  try {
    // dev: user_id will be provided in a jwt when implemented later
    const res = await fetch(`${baseUrl}/api/todos`, {
      method: "GET",
      headers: {
        "user-id": "1",
      },
    });
    const data = await res.json();

    // dev: for testing
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Create a todo for a specific user
export async function createTodo(newTodo: todoType) {
  try {
    const res = await fetch(`${baseUrl}/api/todos`, {
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

// Update a todo for a specific user
export async function updateTodos(newTodo: todoType) {
  try {
    const { todoId } = newTodo;
    const res = await fetch(`${baseUrl}/api/todos/${todoId}`, {
      method: "PUT",
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

// Delete a todo for a specific user
export async function deleteTodo(todoId: string | undefined) {
  try {
    const res = await fetch(`${baseUrl}/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "user-id": "1",
      },
    });

    const data = await res.json();
    console.log(data);
    //return data;
  } catch (error) {
    console.log(error);
  }
}

// Update the completed status of a todo for a specific user
export async function completeTodo(todo: todoType) {
  try {
    let newCompletedStatus;
    const { todoId, todoCompleted } = todo;

    todoCompleted === false
      ? (newCompletedStatus = true)
      : (newCompletedStatus = false);

    const res = await fetch(`${baseUrl}/api/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "user-id": "1",
      },
      body: JSON.stringify({
        todo_completed: newCompletedStatus,
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
