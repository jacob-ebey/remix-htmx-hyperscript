import * as React from "react";

export function Board({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="f-row">
        Status:{" "}
        <span id="board-status-default" className="htmx-request-hide">
          Up to date
        </span>
        <span id="board-status-saving" className="htmx-request-block">
          Saving...
        </span>
      </p>
      <script
        type="text/hyperscript"
        dangerouslySetInnerHTML={{
          __html: `
            behavior BoardColumn
              on add
                if .board-todo contains event.item
                  set the name of the first <input/> in event.item to 'todo'
                else
                  set the name of the first <input/> in event.item to 'done'
                end
                send submit to me
              end
            end

            behavior BoardItem
              def toggleEditable(me)
                set input to the last <input/> in me
                log the @data-name of input
              
                set span to the last <span/> in me
                set span.hidden to not span.hidden

                if input.type is 'hidden'
                  set input.type to 'text'
                  put the @data-name of input into input.name
                  call input.select()
                else
                  set input.type to 'hidden'
                  set input.name to ''
                  focus() me
                end
              end
              on keydown[key=='ArrowRight']
                set input to the last <input/> in me
                if input.type is 'text'
                  exit
                end
                if name of the first <input/> in me is not 'done'
                  set form to the next <form/> from me
                  set the name of the first <input/> in me to 'done'
                  put me at the end of the first <ul/> in the next .board-done from me
                  focus() me
                  send submit to form
                end
              end
              on keydown[key=='ArrowLeft']
                set input to the last <input/> in me
                if input.type is 'text'
                  exit
                end
                if name of the first <input/> in me is not 'todo'
                  set form to the previous <form/> from me
                  set the name of the first <input/> in me to 'todo'
                  put me at the end of the <ul/> in the previous .board-todo from me
                  focus() me
                  send submit to form
                end
              end
              on dblclick
                toggleEditable(me)
              end
              on keydown[key=='Enter']
                set input to the last <input/> in me
                set span to the last <span/> in me

                if input.type is 'hidden'
                  toggleEditable(me)
                else
                  send submit to the closest <form/>
                  put input.value into span.textContent
                  toggleEditable(me)
                end
                halt the event
              end
              on keydown[key=='Escape']
                set input to the last <input/> in me
                if input.type is 'text'
                  toggleEditable(me)
                end
              end
            end
          `,
        }}
      />
      <div className="grid overflow:auto">{children}</div>
      <script
        src="https://unpkg.com/sortablejs@1.15.0/Sortable.min.js"
        _="
          on load
            repeat for s in .sortable
              if Sortable and not s.sortable
                make a Sortable from it, {
                  group: {
                    name: 'todo',
                    pull: true
                  },
                  sort: false
                }
                then set sortable of s to the result
              end
            end
          end
        "
      />
    </div>
  );
}

export function BoardColumn({
  title,
  action,
  intent,
  col,
  color,
  children,
}: {
  title: string;
  action: string;
  intent: string;
  col: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-cols={col}
      className={`f-col box ${color}`}
      style={{ minWidth: "16em" }}
    >
      <p>{title}</p>
      <form
        method="post"
        action={action}
        hx-post={action}
        hx-swap="none transition:false"
        hx-sync="this:replace"
        hx-indicator="#board-status-default, #board-status-saving"
        hx-headers='{"hx-swap": "none"}'
        className={`board-${intent} f-col flex-grow:1`}
        _="install BoardColumn"
      >
        <ul role="list" className="sortable flex-grow:1">
          {children}
        </ul>
      </form>
    </div>
  );
}

export function BoardItem({
  id,
  label,
  done,
}: {
  id: number;
  label: string;
  done?: boolean;
}) {
  return (
    <li key={id} className="box plain" tabIndex={0} _="install BoardItem">
      <input type="hidden" name={done ? "done" : "todo"} value={String(id)} />
      <span>{label}</span>
      <input type="hidden" data-name={`label_${id}`} defaultValue={label} />
    </li>
  );
}
