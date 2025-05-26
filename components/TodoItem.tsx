"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { Todo } from "../app/lib/types";

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border p-2 rounded bg-white"
    >
      <div className="font-medium text-black">{todo.text}</div>
      <div className="text-sm text-gray-500">
        {todo.category} | {todo.priority} | {todo.date}
      </div>
    </div>
  );
}
