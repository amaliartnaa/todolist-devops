"use client";

import React, { Dispatch, SetStateAction } from "react";
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

import { BaseTodo } from "../lib/types";

import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: BaseTodo[];
  setTodos: Dispatch<SetStateAction<BaseTodo[]>>;
  onEdit: (
    id: string,
    text: string,
    category: string,
    priority: string,
  ) => Promise<boolean>;

  onDelete: (id: string) => Promise<void>;
};

export function TodoList({ todos, setTodos, onEdit, onDelete }: TodoListProps) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over?.id);

      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  const handleToggle = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );

    setTodos(updated);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
