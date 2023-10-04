import { AriaAttributes } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { renderToString } from "react-dom/server";

import * as itemsService from "./examples/items";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const back = url.searchParams.has("back");
  const pageStr = url.searchParams.get("page") ?? "1";
  let page = Number.parseInt(pageStr, 10);
  page = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const items = itemsService.getItems(page);

  return new Response(
    renderToString(
      <>
        {items.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            nextPage={index === items.length - 1 ? page + 1 : undefined}
            back={back}
          />
        ))}
      </>
    ),
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export function Item({
  item,
  nextPage,
  back,
}: {
  item: { id: number; label: string };
  nextPage?: number;
  back?: boolean;
}) {
  let props: AriaAttributes & { "data-page"?: string } = {};
  if (!back && typeof nextPage === "number") {
    props = {
      "hx-replace-url": `/examples/infinite-scroll?page=${nextPage}`,
      "hx-get": `/examples/infinite-scroll/api?page=${nextPage}`,
      "hx-swap": "afterend",
      "hx-trigger": "revealed",
      "hx-indicator": "#infinite-scroll-indicator, #infinite-scroll-next-link",
    };
  }

  return (
    <li {...props} key={item.id}>
      {item.label}
    </li>
  );
}
