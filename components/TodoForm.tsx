"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { categories, priorities } from "../app/lib/constants";

type TodoFormProps = {
  onAdd: (
    text: string,
    category: string,
    priority: "low" | "medium" | "high",
  ) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category, priority);
    setText("");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Add a todo"
        radius="sm"
        size="lg"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-2 border rounded bg-white text-black">
              {category}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select category"
            selectedKeys={[category]}
            selectionMode="single"
            onAction={(key) => setCategory(String(key))}
          >
            {categories.map((c) => (
              <DropdownItem key={c}>{c}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-2 border rounded bg-white capitalize text-black">
              {priority}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select priority"
            selectedKeys={[priority]}
            selectionMode="single"
            onAction={(key) => setPriority(key as "low" | "medium" | "high")}
          >
            {priorities.map((p) => (
              <DropdownItem key={p}>{p}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <Button
        className="bg-blue-500 text-white px-3 py-2 rounded"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
}
