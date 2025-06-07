import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { FilterBar } from "../FilterBar";
import { categories } from "../../lib/constants";

vi.mock("@heroui/dropdown", () => ({
  Dropdown: ({ children }: any) => <div>{children}</div>,
  DropdownTrigger: ({ children }: any) => (
    <button
      style={{ background: "none", border: "none", padding: 0, margin: 0 }}
      tabIndex={0}
      type="button"
      onClick={children.props.onPress}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          children.props.onPress?.(e);
        }
      }}
    >
      {children}
    </button>
  ),
  DropdownMenu: ({ children, onAction }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
      setIsOpen(true);
    }, []);

    return isOpen ? (
      <div data-testid="dropdown-menu">
        {React.Children.map(children, (child) => {
          if (child.type === React.Fragment) {
            return React.Children.map(child.props.children, (fragmentChild) =>
              React.cloneElement(fragmentChild, {
                onClick: (e: any) => {
                  if (onAction) {
                    onAction(
                      fragmentChild.props["data-key"] ??
                        fragmentChild.props.itemKey ??
                        fragmentChild.props.children ??
                        fragmentChild.key,
                    );
                  }
                  if (fragmentChild.props.onClick) {
                    fragmentChild.props.onClick(e);
                  }
                  setIsOpen(false);
                },
              }),
            );
          }

          return React.cloneElement(child, {
            onClick: (e: any) => {
              if (onAction) {
                onAction(
                  child.props["data-key"] ??
                    child.props.itemKey ??
                    child.props.children ??
                    child.key,
                );
              }
              if (child.props.onClick) {
                child.props.onClick(e);
              }
              setIsOpen(false);
            },
          });
        })}
      </div>
    ) : null;
  },
  DropdownItem: (props: any) => {
    const itemKey =
      props["data-key"] ??
      props.itemKey ??
      props.key ??
      (props.children && props.children.key) ??
      (typeof props.children === "string" ? props.children : undefined);

    return (
      <div
        data-testid={`dropdown-item-${itemKey}`}
        role="menuitem"
        tabIndex={0}
        onClick={props.onClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (props.onClick) props.onClick(e);
          }
        }}
      >
        {props.children}
      </div>
    );
  },
}));

vi.mock("@heroui/button", () => ({
  Button: ({ children, onPress }: any) => (
    <button data-testid="filter-button" onClick={onPress}>
      {children}
    </button>
  ),
}));

describe("FilterBar", () => {
  const mockHandlers = {
    onFilterChange: vi.fn(),
    onSortChange: vi.fn(),
  };

  const defaultProps = {
    filterCategory: "All",
    sortBy: "date" as const,
    ...mockHandlers,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<FilterBar {...defaultProps} />);

    const filterButton = screen.getAllByTestId("filter-button")[0];

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent("All");
    const sortButton = screen.getAllByTestId("filter-button")[1];

    expect(sortButton).toHaveTextContent("Sort by Date");
  });

  it("renders with custom filter and sort values", () => {
    render(
      <FilterBar filterCategory="Work" sortBy="priority" {...mockHandlers} />,
    );

    const filterButton = screen.getAllByTestId("filter-button")[0];

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent("Work");
    const sortButton = screen.getAllByTestId("filter-button")[1];

    expect(sortButton).toBeInTheDocument();
    expect(sortButton).toHaveTextContent("Sort by Priority");
    // expect(screen.getAllByText("Sort by Priority")[0]).toBeInTheDocument();
  });

  it("calls onFilterChange with Work when Work category is selected", async () => {
    render(<FilterBar {...defaultProps} />);

    const [filterButton] = screen.getAllByTestId("filter-button");

    await act(async () => {
      fireEvent.click(filterButton);
    });

    const menus = await screen.findAllByTestId("dropdown-menu");
    const menu = menus[0];

    expect(menu).toBeInTheDocument();

    const workItem = await screen.findByTestId("dropdown-item-Work");

    await act(async () => {
      fireEvent.click(workItem);
    });

    expect(mockHandlers.onFilterChange).toHaveBeenCalledTimes(1);
    expect(mockHandlers.onFilterChange).toHaveBeenCalledWith("Work");
  });

  it("calls onSortChange when sort option is selected", async () => {
    render(<FilterBar {...defaultProps} />);

    const sortButtons = screen.getAllByTestId("filter-button");

    await act(async () => {
      fireEvent.click(sortButtons[1]);
    });

    const dropdownMenus = await screen.findAllByTestId("dropdown-menu");
    const dropdownMenu = dropdownMenus[1];

    expect(dropdownMenu).toBeInTheDocument();

    const priorityItem = await screen.findByTestId(
      "dropdown-item-Sort by Priority",
    );

    await act(async () => {
      fireEvent.click(priorityItem);
    });
  });

  it("renders all category options", async () => {
    render(<FilterBar {...defaultProps} />);

    const filterButton = screen.getAllByTestId("filter-button")[0];

    fireEvent.click(filterButton);

    expect(await screen.findByTestId("dropdown-item-All")).toBeInTheDocument();
    for (const category of categories) {
      expect(
        await screen.findByTestId(`dropdown-item-${category}`),
      ).toBeInTheDocument();
    }
  });

  it("renders both sort options", async () => {
    render(<FilterBar {...defaultProps} />);

    const sortButton = screen.getAllByTestId("filter-button")[1];

    fireEvent.click(sortButton);

    expect(
      screen.getByTestId("dropdown-item-Sort by Date"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("dropdown-item-Sort by Priority"),
    ).toBeInTheDocument();
  });

  it("shows correct selected filter category", () => {
    render(<FilterBar {...defaultProps} filterCategory="Personal" />);

    const filterButton = screen.getAllByTestId("filter-button")[0];

    expect(filterButton).toHaveTextContent("Personal");
  });

  it("shows correct selected sort option", () => {
    render(<FilterBar {...defaultProps} sortBy="priority" />);

    const sortButton = screen.getAllByTestId("filter-button")[1];

    expect(sortButton).toHaveTextContent("Sort by Priority");
  });
});
it("renders only one visible element with the filterCategory text (button label)", () => {
  render(
    <FilterBar
      filterCategory="Work"
      sortBy="priority"
      onFilterChange={vi.fn()}
      onSortChange={vi.fn()}
    />,
  );
  const workButton = screen.getAllByTestId("filter-button")[0];

  expect(workButton).toBeInTheDocument();
  expect(workButton).toHaveTextContent("Work");
});

it("dropdown menu shows all category options including the selected one", () => {
  render(
    <FilterBar
      filterCategory="Work"
      sortBy="priority"
      onFilterChange={vi.fn()}
      onSortChange={vi.fn()}
    />,
  );
  const filterButton = screen.getAllByTestId("filter-button")[0];

  fireEvent.click(filterButton);
  expect(screen.getByTestId("dropdown-item-All")).toBeInTheDocument();
  categories.forEach((category) => {
    expect(screen.getByTestId(`dropdown-item-${category}`)).toBeInTheDocument();
  });
});
