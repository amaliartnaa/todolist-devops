import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todosRouter from "./routes/todos";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`🚀 Express running on ${PORT}`));
