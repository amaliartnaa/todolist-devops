import { priorityOrder } from "./constants";
import { BaseTodo as Todo } from "./types";

export const getFilteredSortedTodos = (
  todos: Array<Todo>,
  filterCategory: string,
  sortBy: "date" | "priority",
): Array<Todo> => {
  let filtered =
    filterCategory === "All"
      ? todos
      : todos.filter((todo) => todo.category === filterCategory);

  if (sortBy === "date") {
    filtered = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  } else if (sortBy === "priority") {
    filtered = [...filtered].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );
  }

  return filtered;
};
