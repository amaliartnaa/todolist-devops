import { Router } from "express";

import db from "../db";
import { TodoRow } from "../types";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const [rows] = await db.query<TodoRow[]>("SELECT * FROM todos");

    res.json(rows);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", detail: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, category, priority } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const [result] = await db.query<any>(
      "INSERT INTO todos (text, category, priority, date, completed) VALUES (?, ?, ?, ?, ?)",
      [text, category, priority, date, false],
    );

    const insertedId = result.insertId;

    const [rows] = await db.query<TodoRow[]>(
      "SELECT * FROM todos WHERE id = ?",
      [insertedId],
    );

    const newTodo = rows[0];

    res.status(201).json(newTodo);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", detail: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { text, category, priority } = req.body;
  const { id } = req.params;

  await db.query(
    "UPDATE todos SET text = ?, category = ?, priority = ? WHERE id = ?",
    [text, category, priority, id],
  );

  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM todos WHERE id = ?", [id]);
    res.sendStatus(200);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Failed to delete todo", detail: err.message });
  }
});

export default router;
