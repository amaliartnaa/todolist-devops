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
import { addToast } from "@heroui/toast";

import { categories, priorities } from "../lib/constants";

interface TodoFormProps {
  onAddTodo: (
    text: string,
    category: string,
    priority: string,
  ) => Promise<boolean>;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"" | "Low" | "Medium" | "High">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category || !priority) return;

    const success = await onAddTodo(text, category, priority);

    if (success) {
      setText("");
      setCategory("");
      setPriority("");
    } else {
      addToast({
        title: "Failed",
        description: "Gagal menambahkan todo.",
        color: "danger",
      });
    }
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
        <div className="flex flex-col gap-4 sm:flex-row">
          <Dropdown>
            <DropdownTrigger>
              <Button className="rounded border bg-white px-4 py-2 text-black">
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
              <Button className="rounded border bg-white px-4 py-2 capitalize text-black">
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
          className="rounded bg-blue-500 px-3 py-2 text-white"
          type="submit"
        >
          Add
        </Button>
      </div>
    </form>
  );
}
