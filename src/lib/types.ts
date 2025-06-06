export type Todo = {
  id: string;
  text: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  completed: boolean;
};
