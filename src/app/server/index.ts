import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todosRouter from "./routes/todos";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-app-381607765507.asia-southeast2.run.app",
  "https://todo-app-dev-381607765507.asia-southeast2.run.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`🚀 Express running on ${PORT}`));
