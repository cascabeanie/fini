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
    const createUser = await sql`
        INSERT INTO users
            (username, password)
        VALUES
            (${username}, ${hashedPass})
        RETURNING *
        `;

    const token = jwt.sign(
      { id: createUser[0].id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ createUser, token });
  } catch (error) {
    console.error(error);
    // checks first that username is available
    if (error.code === "23505") {
      return res.status(400).json({
        errorMessage: "Sorry, username has already been taken.",
      });
    }

    res.status(500).json({
      errorMessage: "Registration has failed, please try again.",
    });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = await sql`
        SELECT
            *
        FROM users
        WHERE username = ${username}
      `;

    if (!getUser[0]) {
      return res.status(404).json({ errorMessage: "User not found." });
    }

    const isPasswordValid = bcrypt.compareSync(password, getUser[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ errorMessage: "Password is invalid." });
    }

    const token = jwt.sign({ id: getUser[0].id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ getUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "Login has failed, please try again.",
    });
  }
});

// Verify a user's token
router.post("/verify", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(200)
      .json({ authErrorMessage: "No token provided to server." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
    if (error) {
      return res.status(200).json({ authErrorMessage: "Token is invalid." });
    } else {
      return res.status(200).json({ authSuccessMessage: "Token is valid." });
    }
  });
});

export default router;
