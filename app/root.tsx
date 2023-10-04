import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet } from "@remix-run/react";
import missingStylesHref from "missing.css";

import globalStylesHref from "./global.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: missingStylesHref },
  // { rel: "stylesheet", href: "/pagefind/pagefind-ui.css" },
  { rel: "stylesheet", href: globalStylesHref },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <meta
          name="htmx-config"
          content={JSON.stringify({ globalViewTransitions: true })}
        />
        <Links />
        <script src="https://unpkg.com/htmx.org@1.9.6/dist/htmx.min.js" />
        <script src="https://unpkg.com/hyperscript.org@0.9.11/dist/_hyperscript.min.js" />
        <script src="/pagefind/pagefind.js" type="module" />
        <script src="/pagefind/pagefind-ui.js" />
        <LiveReload />
      </head>
      <body
        hx-boost="true"
        hx-sync="body:replace"
        hx-indicator="#global-loading"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
        }}
      >
        <header
          style={{
            position: "relative",
          }}
        >
          <p className="<h2> f-row flex-wrap:wrap align-items:end">
            <span className="flex-grow:1">Remix + HTMX + Hyperscript </span>
          </p>
          <nav className="breadcrumbs" aria-label="navigation">
            <ul role="list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/examples/infinite-scroll">Infinite Scroll</a>
              </li>
              <li>
                <a href="/examples/board">D&D Board</a>
              </li>
              <li>
                <search
                  _="
                    init
                      make a PagefindUI from {
                        element: #search,
                        showImages: false
                      }
                    end
                    on keydown[key=='k' and (metaKey or ctrlKey)] from window
                      click() the first <button/> in me
                    end
                  "
                >
                  <strong>
                    <button
                      type="button"
                      data-pagefind-search
                      _="
                        on click
                          set the *overflow of the body to 'hidden'
                          get the last <dialog/> then set its open to true
                          focus() the first <input/> in the last <dialog/>
                          halt the event
                        end
                      "
                    >
                      Search
                    </button>
                  </strong>
                </search>
              </li>
            </ul>
          </nav>
          <progress
            id="global-loading"
            className="htmx-request-block"
            style={{
              position: "absolute",
              top: "calc(100% - 8px)",
              left: 0,
              width: "100%",
            }}
          >
            loading
          </progress>
        </header>
        <Outlet />
        <dialog
          _="
            on click from elsewhere
              if my open
                click() the first <button/> in me
                halt the event
              end
            end
            on keydown[key=='Escape'] from me
              click() the first <button/> in me
              halt the event
            end
            on keydown[key=='Tab'] from me
              focus() the next <input, button, a/>
                from document.activeElement
                within me
                with wrapping
              halt the event
            on keydown[key=='Tab' and shiftKey] from me
              log 'here'
              focus() the previous <input, button, a/>
                from target
                within me
                with wrapping
            end
          "
        >
          <div
            className="titlebar"
            style={{
              display: "flex",
              marginInline: "calc(-1*var(--gap))",
              paddingBottom: "calc(var(--gap)/2)",
              paddingTop: "calc(var(--gap)/2)",
            }}
          >
            <span className="flex-grow:1">Search</span>
            <button
              type="button"
              aria-label="close search"
              _="
                on click
                  set the *overflow of the body to null
                  get the closest <dialog/> then set its open to false
                  focus() the first <button/> in the first <search/>
                  halt the event
                end
              "
            >
              ╳
            </button>
          </div>
          <div
            id="search"
            style={{
              paddingBottom: "var(--gap)",
              paddingTop: "var(--gap)",
              flex: 1,
              overflowY: "auto",
            }}
          />
        </dialog>
      </body>
    </html>
  );
}
