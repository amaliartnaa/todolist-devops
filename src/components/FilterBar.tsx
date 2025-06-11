"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { categories } from "../lib/constants";

type FilterBarProps = {
  filterCategory: string;
  sortBy: "date" | "priority";
  onFilterChange: (value: string) => void;
  onSortChange: (value: "date" | "priority") => void;
};

export function FilterBar({
  filterCategory,
  sortBy,
  onFilterChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <Dropdown>
        <DropdownTrigger>
          <Button className="rounded-lg border bg-white px-4 py-2 text-black shadow-sm">
            {filterCategory}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Filter by category"
          selectedKeys={[filterCategory]}
          selectionMode="single"
          onAction={(key) => onFilterChange(String(key))}
        >
          <DropdownItem key="All">All</DropdownItem>
          <>
            {categories.map((c) => (
              <DropdownItem key={c}>{c}</DropdownItem>
            ))}
          </>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button className="rounded-lg border bg-white px-4 py-2 text-black shadow-sm">
            {sortBy === "date" ? "Sort by Date" : "Sort by Priority"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Sort by"
          selectedKeys={[sortBy]}
          selectionMode="single"
          onAction={(key) => onSortChange(key as "date" | "priority")}
        >
          <DropdownItem key="date">Sort by Date</DropdownItem>
          <DropdownItem key="priority">Sort by Priority</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
