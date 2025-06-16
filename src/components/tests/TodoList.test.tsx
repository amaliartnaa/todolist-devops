import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import "@testing-library/jest-dom"; // Tambahkan ini
import { BaseTodo } from "../../lib/types";
import { TodoList } from "../TodoList";

describe("TodoList", () => {
  const mockTodos: BaseTodo[] = [
    {
      id: "1",
      text: "Todo 1",
      completed: false,
      category: "work",
      priority: "Medium",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      text: "Todo 2",
      completed: true,
      category: "personal",
      priority: "High",
      date: new Date().toISOString(),
    },
  ];

  const mockSetTodos = vi.fn();
  const mockOnEdit = vi.fn().mockResolvedValue(true);
  const mockOnDelete = vi.fn().mockResolvedValue(undefined);

  it("renders list of todos", () => {
    render(
      <TodoList
        setTodos={mockSetTodos}
        todos={mockTodos}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", () => {
    render(
      <TodoList
        setTodos={mockSetTodos}
        todos={mockTodos}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const checkbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(checkbox);

    expect(mockSetTodos).toHaveBeenCalled();
  });
});
