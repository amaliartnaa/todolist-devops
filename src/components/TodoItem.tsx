"use client";

import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Chip } from "@heroui/chip";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Todo } from "../lib/types";

const categories = ["Work", "Personal", "Study", "Other"] as const;
const priorities = ["Low", "Medium", "High"] as const;

type Category = (typeof categories)[number];
type Priority = (typeof priorities)[number];

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    text: string,
    category: Category,
    priority: Priority,
  ) => void;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const priorityColors: Record<Priority, string> = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-red-200 text-red-800",
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState<Category | "">("");
  const [editPriority, setEditPriority] = useState<Priority | "">("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
      setEditCategory("");
      setEditPriority("");
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (!editCategory || !editPriority) return;
    onEdit(todo.id, editText, editCategory, editPriority);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-4 space-y-1 rounded border bg-white p-2"
    >
      <div className="flex items-center gap-2">
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
        {isEditing ? (
          <Input
            ref={inputRef}
            className="flex-1"
            radius="sm"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span
            className={`flex-1 font-medium text-black ${
              todo.completed ? "text-gray-400 line-through" : ""
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}

        <Button
          isIconOnly
          className="bg-blue-500 px-1 text-sm"
          onPress={() => {
            setIsEditing(false);
            setTimeout(() => {
              setIsEditing(true);
            }, 0);
          }}
        >
          <FaPencilAlt />
        </Button>

        <Button
          isIconOnly
          className="bg-red-500 px-1 text-sm"
          onPress={() => onDelete(todo.id)}
        >
          <FaTrashAlt />
        </Button>
      </div>

      {isEditing && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Dropdown className="w-28">
              <DropdownTrigger>
                <Button className="border bg-white px-4 py-2 text-black">
                  {editCategory || "Edit The Category"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Edit Category"
                selectedKeys={editCategory ? [editCategory] : []}
                selectionMode="single"
                onAction={(key) => setEditCategory(key as Category)}
              >
                {categories.map((c) => (
                  <DropdownItem key={c}>{c}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="w-28">
              <DropdownTrigger>
                <Button className="border bg-white px-4 py-2 text-black">
                  {editPriority
                    ? capitalize(editPriority)
                    : "Edit Your Priority"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Edit Priority"
                selectedKeys={editPriority ? [editPriority] : []}
                selectionMode="single"
                onAction={(key) => setEditPriority(key as Priority)}
              >
                {priorities.map((p) => (
                  <DropdownItem key={p}>{capitalize(p)}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <Button
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
            onPress={handleSave}
          >
            Save
          </Button>
        </div>
      )}

      <div className="flex gap-2 text-center">
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
