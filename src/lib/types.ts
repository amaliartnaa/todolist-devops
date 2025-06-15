export type BaseTodo = {
  id: string;
  text: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  completed: boolean;
};
