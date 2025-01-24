import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "../db/db.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);

  try {
    const registerUser = await sql`
        INSERT INTO users
            (username, password)
        VALUES
            (${username}, ${hashedPass})
        RETURNING *
        `;

    const token = jwt.sign(
      { id: await registerUser[0].id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({ registerUser, token });
  } catch (error) {
    console.error(error);
    // checks first that username is available
    if (error.code === "23505") {
      return res.status(400).json({
        message: "Sorry, username has already been taken.",
      });
    }

    res.status(500).json({
      message: "Registration has failed, please try again.",
    });
  }
});

// Login an existing user

export default router;
