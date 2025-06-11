"use client";

import type { Todo } from "@/src/lib/types";

import React from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { TodoItem } from "./TodoItem";

import { useTodos } from "@/src/context/TodosContext";

type TodoListProps = {
  displayedTodos?: Array<Todo>;
};

export function TodoList({ displayedTodos }: TodoListProps) {
  const { todos, setTodos } = useTodos();
  const listToRender = displayedTodos ?? todos;

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  const handleEdit = (
    id: string,
    newText: string,
    newCategory: string,
    newPriority: "Low" | "Medium" | "High",
  ) => {
    const updated = todos.map((t) =>
      t.id === id
        ? {
            ...t,
            text: newText,
            category: newCategory,
            priority: newPriority,
          }
        : t,
    );

    setTodos(updated);
  };

  const handleToggle = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );

    setTodos(updated);
  };

  const handleDelete = (id: string) => {
    const updated = todos.filter((t) => t.id !== id);

    setTodos(updated);
  };

  if (!listToRender.length) {
    return <p className="text-center text-gray-400">No todos to show</p>;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={listToRender.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {listToRender.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
