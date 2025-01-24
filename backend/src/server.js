import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import authMiddleware from "./middleware/auth-middleware.js";
import todosRoutes from "./routes/todo-routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// dev: for testing
// simulates slow connection
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", authMiddleware, todosRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
