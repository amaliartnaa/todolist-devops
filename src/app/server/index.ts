import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

import todosRouter from "./routes/todos";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

const app = express();

app.use(Sentry.Handlers.requestHandler());

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

app.options("*", cors());
app.use(express.json());
app.use("/api/todos", todosRouter);

app.get("/", (_, res) => {
  res.send("🚀 Todo backend is up and running!");
});

const PORT = process.env.PORT || 3001;

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT);
