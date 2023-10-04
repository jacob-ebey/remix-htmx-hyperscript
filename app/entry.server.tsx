import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";

import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  const headers = new Headers(responseHeaders);
  headers.set("Content-Type", "text/html");
  return new Response(
    renderToString(<RemixServer context={remixContext} url={request.url} />),
    {
      headers,
      status: responseStatusCode,
    }
  );
}
