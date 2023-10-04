const perPage = 30;
export function getItems(page: number) {
  page = page <= 0 ? 0 : page - 1;
  let id = page * perPage;

  const items: { id: number; label: string }[] = [];
  for (let i = 0; i < perPage; i++) {
    id++;
    items.push({ id, label: `Item ${id}` });
  }

  return items;
}
