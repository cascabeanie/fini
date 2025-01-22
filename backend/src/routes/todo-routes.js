import express from "express";
import sql from "../db/db.js";

const router = express.Router();

// Get all todos for a specific user
router.get("/", async (req, res) => {
  try {
    // dev: user_id will be obtained from a jwt when implemented later
    const user_id = req.headers["user-id"];

    const allTodos = await sql`
        SELECT
            *
        FROM todos
        WHERE user_id = ${user_id}
      `;
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo for a user
router.post("/", async (req, res) => {
  const user_id = req.headers["user-id"];

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

    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
