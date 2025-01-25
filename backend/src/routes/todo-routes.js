import express from "express";
import sql from "../db/db.js";

const router = express.Router();

// Get all todos for a specific user
router.get("/", async (req, res) => {
  try {
    const user_id = req.userId;

    const allTodos = await sql`
        SELECT
            *
        FROM todos
        WHERE user_id = ${user_id}
      `;
    res.status(200).json(allTodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "An error has occured while fetching tasks.",
    });
  }
});

// Create a new todo for a user
router.post("/", async (req, res) => {
  const user_id = req.userId;

  const {
    todo_category,
    todo_title,
    todo_notes,
    todo_deadline,
    todo_priority,
  } = req.body;

  try {
    const newTodo = await sql`
      INSERT INTO todos
        (todo_category, todo_title, todo_notes, todo_deadline, todo_priority, todo_completed, user_id)
      VALUES
        (${todo_category}, ${todo_title}, ${todo_notes}, ${todo_deadline}, ${todo_priority}, FALSE, ${user_id})
      RETURNING *
    `;

    res
      .status(201)
      .json({ newTodo: newTodo, successMessage: "Task successfully created" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ errorMessage: "An error has occured while creating a task." });
  }
});

// Update an existing todo for a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;
  const todo = {
    todo_category: req.body.todo_category,
    todo_title: req.body.todo_title,
    todo_notes: req.body.todo_notes,
    todo_deadline: req.body.todo_deadline,
    todo_priority: req.body.todo_priority,
    todo_completed: "FALSE",
  };

  try {
    const updatedTodo = await sql`
      UPDATE todos SET ${sql(
        todo,
        "todo_category",
        "todo_title",
        "todo_notes",
        "todo_deadline",
        "todo_priority",
        "todo_completed"
      )}
      WHERE user_id = ${user_id}
      AND todo_id = ${id}
      RETURNING *
    `;

    res.status(200).json({
      updatedTodo: updatedTodo,
      successMessage: "Task successfully updated",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ errorMessage: "An error has occured while updating a task." });
  }
});

// Delete an existing todo for a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;

  try {
    await sql`
      DELETE FROM todos
      WHERE user_id = ${user_id}
      AND todo_id = ${id}
    `;

    res.status(200).json({ successMessage: "Task successfully deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ errorMessage: "An error has occured while deleting a task." });
  }
});

// Update the completed status for a user's todo
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;
  const todo = {
    todo_completed: req.body.todo_completed,
  };

  try {
    const updatedCompletedStatus = await sql`
      UPDATE todos SET ${sql(todo, "todo_completed")}
      WHERE user_id = ${user_id}
      AND todo_id = ${id}
      RETURNING *
    `;

    res.status(200).json({
      newStatus: updatedCompletedStatus,
      successMessage: "Completed status successfully updated",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ errorMessage: "An error has occured while completing a task." });
  }
});

export default router;
