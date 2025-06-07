import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { TodoForm } from "../TodoForm";
import { categories } from "../../lib/constants";

vi.mock("@heroui/button", () => ({
  Button: ({ children, onPress, type, className }: any) => (
    <button
      data-testid={
        className?.includes("bg-blue-500")
          ? "submit-button"
          : className?.includes("bg-white")
            ? "dropdown-button"
            : undefined
      }
      type={type}
      onClick={onPress}
    >
      {children}
    </button>
  ),
}));

vi.mock("@heroui/input", () => ({
  Input: ({ value, onChange, placeholder }: any) => (
    <input
      data-testid="todo-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock("@heroui/dropdown", () => ({
  Dropdown: ({ children }: any) => <div>{children}</div>,
  DropdownTrigger: ({ children }: any) => (
    <div
      role="button"
      tabIndex={0}
      onClick={children.props.onPress}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          children.props.onPress?.();
        }
      }}
    >
      {children}
    </div>
  ),
  DropdownMenu: ({ children, onAction }: any) => (
    <div data-testid="dropdown-menu">
      {React.Children.map(children, (child) => {
        if (child.type === React.Fragment) {
          return child.props.children.map((fragmentChild: any) => (
            <div
              key={fragmentChild.key}
              data-testid={`dropdown-item-${fragmentChild.key}`}
              role="button"
              tabIndex={0}
              onClick={() => onAction(fragmentChild.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onAction(fragmentChild.key);
                }
              }}
            >
              {fragmentChild.props.children}
            </div>
          ));
        }

        return (
          <div
            data-testid={`dropdown-item-${child.key}`}
            role="button"
            tabIndex={0}
            onClick={() => onAction(child.key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAction(child.key);
              }
            }}
          >
            {child.props.children}
          </div>
        );
      })}
    </div>
  ),
  DropdownItem: ({ children, key }: any) => <div key={key}>{children}</div>,
}));

describe("TodoForm", () => {
  const mockOnAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByText("Select a Category")).toBeInTheDocument();
    expect(screen.getByText("Choose Your Priority")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("updates input value when typing", async () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId("todo-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "New todo" } });
    });

    expect(input).toHaveValue("New todo");
  });

  it("selects a category from dropdown", async () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const categoryButtons = screen.getAllByTestId("dropdown-button");

    await act(async () => {
      fireEvent.click(categoryButtons[0]);
    });

    const workItem = await screen.findByTestId(
      `dropdown-item-${categories[0]}`,
    );

    await act(async () => {
      fireEvent.click(workItem);
    });

    const categoryElements = screen.getAllByText(categories[0]);

    expect(categoryElements.length).toBeGreaterThan(0);
    categoryElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("selects a priority from dropdown", async () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const priorityButtons = screen.getAllByTestId("dropdown-button");

    await act(async () => {
      fireEvent.click(priorityButtons[1]);
    });

    const highPriorityItem = await screen.findByTestId("dropdown-item-high");

    await act(async () => {
      fireEvent.click(highPriorityItem);
    });

    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("calls onAdd with correct data when form is submitted", async () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId("todo-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test todo" } });
    });

    const categoryButtons = screen.getAllByTestId("dropdown-button");

    await act(async () => {
      fireEvent.click(categoryButtons[0]);
    });
    const workItem = await screen.findByTestId(
      `dropdown-item-${categories[0]}`,
    );

    await act(async () => {
      fireEvent.click(workItem);
    });

    await act(async () => {
      fireEvent.click(categoryButtons[1]);
    });
    const mediumItem = await screen.findByTestId("dropdown-item-medium");

    await act(async () => {
      fireEvent.click(mediumItem);
    });

    const submitButton = screen.getByTestId("submit-button");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnAdd).toHaveBeenCalledWith("Test todo", "Work", "medium");
  });

  it("does not call onAdd when form is incomplete", async () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId("todo-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test todo" } });
    });

    const submitButton = screen.getByTestId("submit-button");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it("resets input after successful submission", async () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId("todo-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test todo" } });
    });

    const categoryButtons = screen.getAllByTestId("dropdown-button");

    await act(async () => {
      fireEvent.click(categoryButtons[0]);
    });
    const workItem = await screen.findByTestId(
      `dropdown-item-${categories[0]}`,
    );

    await act(async () => {
      fireEvent.click(workItem);
    });

    await act(async () => {
      fireEvent.click(categoryButtons[1]);
    });
    const mediumItem = await screen.findByTestId("dropdown-item-medium");

    await act(async () => {
      fireEvent.click(mediumItem);
    });

    const submitButton = screen.getByTestId("submit-button");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(input).toHaveValue("");
  });
});
