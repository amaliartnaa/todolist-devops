import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todosRouter from "./routes/todos";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://todo-app-dev-381607765507.asia-southeast2.run.app",
      "https://todo-app-381607765507.asia-southeast2.run.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

// console.log("🚧 CORS middleware configured");

app.options("*", cors());

app.use(express.json());

app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`🚀 Express running on ${PORT}`));
