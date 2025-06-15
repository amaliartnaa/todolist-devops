"use client";

import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { Divider } from "@heroui/divider";

import { FilterBar } from "../components/FilterBar";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

import { getFilteredSortedTodos } from "@/src/lib/utils";
import { Todo } from "@/src/lib/types";

export default function HomePage() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const handleAdd = (
    text: string,
    category: string,
    priority: "Low" | "Medium" | "High",
  ) => {
    const newTodo: Todo = {
      id: uuid(),
      text,
      category,
      priority,
      date: format(new Date(), "yyyy-MM-dd"),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const displayedTodos = getFilteredSortedTodos(todos, filterCategory, sortBy);

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-10">
      <h1 className="text-center text-2xl font-bold">Todo List testTEST📝</h1>

      <TodoForm onAdd={handleAdd} />
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
