import { type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";

import * as todosService from "./examples/todos";

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

export default function Board() {
  const location = useLocation();
  const { done, todo } = useLoaderData<typeof loader>();

  return (
    <main>
      <script
        src="https://unpkg.com/sortablejs@1.15.0/Sortable.min.js"
        _="
          on load
            repeat in .sortable
              make a Sortable from it, {
                group: {
                  name: 'todo',
                  pull: true
                },
                sort: false
              }
            end
          end
        "
      />

      <h1>D&D Board</h1>
      <p>
        A simple D&D board. Drag and drop the boxes to move them between rows.
      </p>

      <div className="grid overflow:auto">
        <div
          data-cols="1"
          className="f-col box warn"
          style={{ minWidth: "16em" }}
        >
          <p>Todo</p>
          <form
            method="post"
            hx-swap="none transition:false"
            hx-trigger="add"
            className="f-col flex-grow:1"
          >
            <input type="hidden" name="intent" value="todo" />
            <ul role="list" className="sortable flex-grow:1">
              {todo.map((entry) => (
                <li key={entry.id} className="box plain">
                  <input type="hidden" name="id" value={entry.id} />
                  {entry.label}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div
          data-cols="2"
          className="f-col box ok"
          style={{ minWidth: "16em" }}
        >
          <p>Done</p>
          <form
            method="post"
            hx-swap="none transition:false"
            hx-trigger="add"
            className="f-col flex-grow:1"
          >
            <input type="hidden" name="intent" value="done" />
            <ul role="list" className="sortable flex-grow:1">
              {done.map((entry) => (
                <li key={entry.id} className="box plain">
                  <input type="hidden" name="id" value={entry.id} />
                  {entry.label}
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const formIds = formData.getAll("id");

  const ids: number[] = [];
  for (const id of formIds) {
    ids.push(Number(id));
  }

  if (intent === "todo") {
    await todosService.setDone(ids, false);
  } else if (intent === "done") {
    await todosService.setDone(ids, true);
  }

  return null;
}
