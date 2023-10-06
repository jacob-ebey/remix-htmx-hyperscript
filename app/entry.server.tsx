import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";

import { html } from "./utils";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  if (request.headers.get("HX-Swap") === "none") {
    return new Response(null, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  }

  return html(<RemixServer context={remixContext} url={request.url} />, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
