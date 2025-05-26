"use client";

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

import { Todo } from "../app/lib/types";

import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Array<Todo>;
  setTodos: (todos: Array<Todo>) => void;
};

export function TodoList({ todos, setTodos }: TodoListProps) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over?.id);

      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
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
