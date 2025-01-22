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

export default router;
