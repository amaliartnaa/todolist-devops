"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { Todo } from "@/src/lib/types";

type TodosContextType = {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
  addTodo: (todo: Todo) => void;
  editTodo: (
    id: string,
    newText: string,
    newCategory: string,
    newPriority: "Low" | "Medium" | "High",
  ) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    const stored = localStorage.getItem("todos");

    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => setTodos((prev) => [...prev, todo]);

  const editTodo = (
    id: string,
    newText: string,
    newCategory: string,
    newPriority: "Low" | "Medium" | "High",
  ) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              text: newText,
              category: newCategory,
              priority: newPriority,
            }
          : t,
      ),
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, addTodo, editTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);

  if (!ctx) throw new Error("useTodos must be used within TodosProvider");

  return ctx;
};
