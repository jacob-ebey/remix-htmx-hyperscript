import * as React from "react";
import { renderToString } from "react-dom/server";

export function html(node: React.ReactElement, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "text/html");

  return new Response("<!doctype html>"+renderToString(node), {
    ...init,
    headers,
  });
}
