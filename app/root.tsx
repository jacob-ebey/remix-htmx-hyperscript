import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet } from "@remix-run/react";
import missingStylesHref from "missing.css";

import globalStylesHref from "./global.css";
import { Header, SearchDialog } from "./components";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: missingStylesHref },
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
        <Header />
        <Outlet />
        <SearchDialog />
      </body>
    </html>
  );
}
