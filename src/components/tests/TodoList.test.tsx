import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import "@testing-library/jest-dom";

import { TodoList } from "../TodoList";

import { Todo } from "@/app/lib/types";

const sampleTodos: Array<Todo> = [
  {
    id: "1",
    text: "First todo",
    completed: false,
    category: "Work",
    priority: "Medium",
    date: "2024-01-01",
  },
  {
    id: "2",
    text: "Second todo",
    completed: true,
    category: "Personal",
    priority: "High",
    date: "2024-01-02",
  },
];

describe("TodoList", () => {
  it("renders todo items correctly", () => {
    render(<TodoList setTodos={vi.fn()} todos={sampleTodos} />);

    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();
  });
});
