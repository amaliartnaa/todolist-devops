"use client";

import { useEffect, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
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

import { BaseTodo } from "../lib/types";

const categories = ["Work", "Personal", "Study", "Other"] as const;
const priorities = ["Low", "Medium", "High"] as const;

type Category = (typeof categories)[number];
type Priority = (typeof priorities)[number];

type TodoItemProps = {
  todo: BaseTodo;
  onDelete: (id: string) => Promise<void>;
  onEdit: (
    id: string,
    text: string,
    category: string,
    priority: string,
  ) => Promise<boolean>;

  onToggle: (id: string) => void;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const priorityColors: Record<Priority, string> = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-red-200 text-red-800",
};

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState<Category>("Work");
  const [editPriority, setEditPriority] = useState<Priority>("Low");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
      setEditCategory(todo.category as Category);
      setEditPriority(todo.priority);
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (!editText.trim() || !editCategory || !editPriority) return;

    await onEdit(todo.id, editText.trim(), editCategory, editPriority);

    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onDelete(todo.id);
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
          onPress={() => setIsEditing(true)}
        >
          <FaPencilAlt />
        </Button>

        <Button
          isIconOnly
          className="bg-red-500 px-1 text-sm"
          onPress={handleDelete}
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
                  {editCategory}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Edit Category"
                selectedKeys={[editCategory]}
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
                  {capitalize(editPriority)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Edit Priority"
                selectedKeys={[editPriority]}
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
            isDisabled={!editText.trim()}
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
        <Chip className="text-sm">{todo.date}</Chip>
      </div>
    </div>
  );
}
