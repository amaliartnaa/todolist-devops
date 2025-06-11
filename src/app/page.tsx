"use client";

import { useState } from "react";
import { Divider } from "@heroui/divider";

import { FilterBar } from "../components/FilterBar";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

import { getFilteredSortedTodos } from "@/src/lib/utils";
import { useTodos } from "@/src/context/TodosContext";

export default function HomePage() {
  const { todos, addTodo } = useTodos();
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const activeTodos = todos.filter((todo) => !todo.completed);
  const displayedActiveTodos = getFilteredSortedTodos(
    activeTodos,
    filterCategory,
    sortBy,
  );

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-10">
      <h1 className="text-center text-2xl font-bold">Todo List 📝</h1>

      <TodoForm
        onAdd={(text, category, priority) =>
          addTodo({
            id: crypto.randomUUID(),
            text,
            category,
            priority,
            date: new Date().toISOString(),
            completed: false,
          })
        }
      />
      <Divider className="my-4" />
      <FilterBar
        filterCategory={filterCategory}
        sortBy={sortBy}
        onFilterChange={setFilterCategory}
        onSortChange={setSortBy}
      />
      <TodoList displayedTodos={displayedActiveTodos} />
    </main>
  );
}
