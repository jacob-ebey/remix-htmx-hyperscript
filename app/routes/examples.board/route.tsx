import { type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";

import { Board, BoardColumn, BoardItem } from "./components";
import * as todosService from "./service";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix + HTMX + Hyperscript" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const todos = await todosService.getTodos();

  const done: typeof todos = [];
  const todo: typeof todos = [];
  for (const entry of todos) {
    if (entry.done) {
      done.push(entry);
    } else {
      todo.push(entry);
    }
  }

  return {
    done,
    todo,
  };
}

export default function BoardExample() {
  const location = useLocation();
  const { done, todo } = useLoaderData<typeof loader>();

  return (
    <main id="main">
      <h1>D&D Board</h1>
      <p>
        A simple D&D board. Drag and drop the boxes to move them between rows.
        It has been enhanced using Hyperscript to support moving items with the
        arrow keys.
      </p>

      <Board>
        <BoardColumn
          col={1}
          color="warn"
          title="Todo"
          intent="todo"
          action={location.pathname}
        >
          {todo.map((entry) => (
            <BoardItem key={entry.id} id={entry.id} label={entry.label} />
          ))}
        </BoardColumn>
        <BoardColumn
          col={2}
          color="ok"
          title="Done"
          intent="done"
          action={location.pathname}
        >
          {done.map((entry) => (
            <BoardItem key={entry.id} id={entry.id} label={entry.label} done />
          ))}
        </BoardColumn>
      </Board>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "todo") {
    await todosService.setDone(
      formData.getAll("todo").map((id) => Number.parseInt(String(id), 10)),
      false
    );
  } else if (intent === "done") {
    await todosService.setDone(
      formData.getAll("done").map((id) => Number.parseInt(String(id), 10)),
      true
    );
  }

  return null;
}
