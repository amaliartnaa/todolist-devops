"use client";

import React, { useState, useEffect } from "react";
import { Chip } from "@heroui/chip";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Divider } from "@heroui/divider";

import { Todo } from "@/src/lib/types";
import { FilterBar } from "@/src/components/FilterBar";
import { priorities } from "@/src/lib/constants";
import { getFilteredSortedTodos } from "@/src/lib/utils";

type Priority = (typeof priorities)[number];

const priorityColors: Record<Priority, string> = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-red-200 text-red-800",
};

function ArchivedTodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm flex flex-col gap-2 w-full">
      <h3 className="font-semibold text-lg text-black break-words">
        {todo.text}
      </h3>
      <div className="flex flex-wrap gap-2 text-center mt-auto">
        <Chip className="text-sm">{todo.category}</Chip>
        <Chip className={`text-sm ${priorityColors[todo.priority]}`}>
          {todo.priority}
        </Chip>
        <Chip className="text-sm">
          {format(new Date(todo.date), "dd MMM yyyy, HH:mm", { locale: id })}
        </Chip>
      </div>
    </div>
  );
}

export default function ArchivePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch {
        setTodos([]);
      }
    }
  }, []);

  const completedTodos = todos.filter((todo) => todo.completed);

  const filteredAndSortedCompletedTodos = getFilteredSortedTodos(
    completedTodos,
    filterCategory,
    sortBy,
  );

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-4xl font-bold text-center my-8 text-black">
        Archived To-Do List
      </h1>
      <div className="p-6">
        <FilterBar
          filterCategory={filterCategory}
          sortBy={sortBy}
          onFilterChange={setFilterCategory}
          onSortChange={setSortBy}
        />

        <Divider className="my-4" />

        {filteredAndSortedCompletedTodos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndSortedCompletedTodos.map((todo) => (
              <ArchivedTodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No completed todos in archive.
          </p>
        )}
      </div>
    </div>
  );
}
