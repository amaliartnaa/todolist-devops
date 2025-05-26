export type Todo = {
  id: string;
  text: string;
  category: string;
  priority: "low" | "medium" | "high";
  date: string;
};
