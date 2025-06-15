"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { categories, priorities } from "../lib/constants";
import { createTodo } from "../lib/api";

export function TodoForm() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"" | "Low" | "Medium" | "High">("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category || !priority) return;
    try {
      await createTodo(text, category, priority);
      setError(null);
      setText("");
      setCategory("");
      setPriority("");
    } catch {
      setError("Failed to create todo");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {error && <Alert color="danger" description={error} title="Error" />}
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
