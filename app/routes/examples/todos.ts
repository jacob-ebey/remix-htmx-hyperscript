const todos = new Map<number, { id: number; label: string; done: boolean }>([
  [1, { id: 1, label: "Buy milk", done: false }],
  [2, { id: 2, label: "Buy eggs", done: false }],
  [3, { id: 3, label: "Buy bread", done: false }],
  [4, { id: 4, label: "Buy butter", done: false }],
]);

export function getTodos() {
  return Array.from(todos.values());
}

export function setDone(ids: number[], done: boolean) {
  for (const id of ids) {
    todos.get(id)!.done = done;
  }
}
