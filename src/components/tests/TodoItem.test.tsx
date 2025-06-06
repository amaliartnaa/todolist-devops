import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { TodoItem } from "../TodoItem";

vi.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({}),
}));

vi.mock("@heroui/button", () => ({
  Button: ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress?: React.MouseEventHandler<HTMLButtonElement>;
  }) => <button onClick={onPress}>{children}</button>,
}));

vi.mock("@heroui/checkbox", () => ({
  Checkbox: ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }) => <input checked={checked} type="checkbox" onChange={onChange} />,
}));

describe("TodoItem", () => {
  const todo = {
    id: "1",
    text: "Test todo",
    completed: false,
    category: "Work",
    priority: "Medium" as "Medium",
    date: "2023-05-01",
  };

  const handlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  it("renders todo text", () => {
    render(<TodoItem todo={todo} {...handlers} />);
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("toggles completion", () => {
    render(<TodoItem todo={todo} {...handlers} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handlers.onToggle).toHaveBeenCalledWith("1");
  });

  it("deletes todo", () => {
    render(<TodoItem todo={todo} {...handlers} />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(handlers.onDelete).toHaveBeenCalledWith("1");
  });

  it("enters edit mode", () => {
    render(<TodoItem todo={todo} {...handlers} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });
});
