"use client";

import { useEffect, useState } from "react";
import { Divider } from "@heroui/divider";
import { addToast } from "@heroui/toast";

import { FilterBar } from "../components/FilterBar";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { BaseTodo as Todo } from "../lib/types";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../lib/api";

import { getFilteredSortedTodos } from "@/src/lib/utils";

export default function HomePage() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        addToast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil todo.",
          color: "danger",
        });
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (
    text: string,
    category: string,
    priority: string,
  ) => {
    try {
      const newTodo = await createTodo(text, category, priority.toLowerCase());

      const parsedTodo: Todo = {
        ...newTodo,
        completed: Boolean(newTodo.completed),
        priority: newTodo.priority
          ? capitalize(newTodo.priority)
          : capitalize(priority),
        date: newTodo.date?.slice(0, 10),
      };

      setTodos((prev) => [...prev, parsedTodo]);

      addToast({
        title: "Todo created!",
        description: "Berhasil ditambahkan.",
        color: "success",
      });

      return true;
    } catch {
      addToast({
        title: "Gagal menambahkan todo",
        description: "Periksa koneksi atau data input.",
        color: "danger",
      });

      return false;
    }
  };

  const handleEdit = async (
    id: string,
    text: string,
    category: string,
    priority: string,
  ) => {
    try {
      const updated = await updateTodo(id, text, category, priority);

      if (!updated) throw new Error("Failed to update");

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                text,
                category,
                priority: priority as "Low" | "Medium" | "High",
              }
            : todo,
        ),
      );

      addToast({
        title: "Todo updated!",
        description: "Perubahan berhasil disimpan.",
        color: "success",
      });

      return true;
    } catch {
      addToast({
        title: "Gagal mengubah todo",
        description: "Silakan coba lagi.",
        color: "danger",
      });

      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      addToast({
        title: "Todo deleted!",
        description: "Todo berhasil dihapus.",
        color: "success",
      });
    } catch {
      addToast({
        title: "Gagal menghapus todo",
        description: "Coba ulangi lagi.",
        color: "danger",
      });
    }
  };

  const displayedTodos = getFilteredSortedTodos(todos, filterCategory, sortBy);

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-10">
      <h1 className="text-center text-2xl font-bold">Todo List 📝</h1>

      <TodoForm onAddTodo={handleAddTodo} />
      <Divider className="my-4" />
      <FilterBar
        filterCategory={filterCategory}
        sortBy={sortBy}
        onFilterChange={setFilterCategory}
        onSortChange={setSortBy}
      />
      <TodoList
        setTodos={setTodos}
        todos={displayedTodos}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}
