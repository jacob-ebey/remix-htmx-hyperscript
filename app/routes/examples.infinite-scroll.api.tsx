import { type LoaderFunctionArgs } from "@remix-run/node";

import { html } from "~/utils";

import * as itemsService from "./examples.infinite-scroll/service";
import { Item } from "./examples.infinite-scroll/components";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const back = url.searchParams.has("back");
  const pageStr = url.searchParams.get("page") ?? "1";
  let page = Number.parseInt(pageStr, 10);
  page = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const items = itemsService.getItems(page);

  return html(
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
  );
}
