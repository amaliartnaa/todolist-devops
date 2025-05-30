"use client";

import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { Divider } from "@heroui/divider";

import { Todo } from "./lib/types";
import { getFilteredSortedTodos } from "./lib/utils";

import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { FilterBar } from "@/components/FilterBar";

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
    <main className="max-w-xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl text-center font-bold">Todo List 📝</h1>

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
