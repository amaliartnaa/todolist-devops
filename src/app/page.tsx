"use client";

import { useState } from "react";
import { Divider } from "@heroui/divider";

import { FilterBar } from "../components/FilterBar";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { BaseTodo as Todo } from "../lib/types";

import { getFilteredSortedTodos } from "@/src/lib/utils";

export default function HomePage() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const displayedTodos = getFilteredSortedTodos(todos, filterCategory, sortBy);

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-10">
      <h1 className="text-center text-2xl font-bold">Todo List 📝</h1>

      <TodoForm />
      <Divider className="my-4" />
      <FilterBar
        filterCategory={filterCategory}
        sortBy={sortBy}
        onFilterChange={setFilterCategory}
        onSortChange={setSortBy}
      />
      <TodoList setTodos={setTodos} todos={displayedTodos} />
    </main>
  );
}
