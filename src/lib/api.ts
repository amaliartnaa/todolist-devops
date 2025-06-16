const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTodos = async () => {
  const res = await fetch(`${API_URL}/api/todos`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

export const createTodo = async (
  text: string,
  category: string,
  priority: string,
) => {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ text, category, priority }),
  });

  if (!res.ok) throw new Error("Failed to create todo");

  return res.json();
};
