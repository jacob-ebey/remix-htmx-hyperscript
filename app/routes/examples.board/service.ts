const todos = new Map<number, { id: number; label: string; done: boolean }>([
  [1, { id: 1, label: "Buy milk", done: false }],
  [2, { id: 2, label: "Buy eggs", done: false }],
  [3, { id: 3, label: "Buy bread", done: false }],
  [4, { id: 4, label: "Buy butter", done: false }],
]);

export function getTodos() {
  return Array.from(todos.values());
}

export function updateTodos(
  upates: Record<number, { label?: string; done?: boolean }>
) {
  for (const [id, todo] of Object.entries(upates)) {
    const currentTodo = todos.get(Number(id));
    if (currentTodo) {
      todos.set(Number(id), { ...currentTodo, ...todo });
    }
  }
}
