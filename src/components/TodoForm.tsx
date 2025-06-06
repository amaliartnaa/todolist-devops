"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { categories, priorities } from "../lib/constants";

type TodoFormProps = {
  onAdd: (
    text: string,
    category: string,
    priority: "Low" | "Medium" | "High",
  ) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"" | "Low" | "Medium" | "High">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category || !priority) return;
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

      <div className="flex flex-row justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button className="px-4 py-2 border rounded bg-white text-black">
                {category || "Select a Category"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select category"
              selectedKeys={category ? [category] : []}
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
              <Button className="px-4 py-2 border rounded bg-white text-black capitalize">
                {priority || "Choose Your Priority"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select priority"
              selectedKeys={priority ? [priority] : []}
              selectionMode="single"
              onAction={(key) => setPriority(key as "Low" | "Medium" | "High")}
            >
              {priorities.map((p) => (
                <DropdownItem key={p.toLowerCase()} className="capitalize">
                  {p}
                </DropdownItem>
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
      </div>
    </form>
  );
}
