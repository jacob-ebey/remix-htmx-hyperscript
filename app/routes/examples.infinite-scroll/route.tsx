import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as itemsService from "./service";

import { Item } from "../examples.infinite-scroll/components";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pageStr = url.searchParams.get("page") ?? "1";
  let page = Number.parseInt(pageStr, 10);
  page = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const items = itemsService.getItems(page);

  return { items, page, nextPage: page + 1 };
}

export default function InfiniteScroll() {
  const { items, page, nextPage } = useLoaderData<typeof loader>();

  return (
    <main id="main">
      <h1>Infinite Scroll</h1>
      <p>A simple infinite scroll example.</p>

      {page > 1 && (
        <p>
          <a
            id="infinite-scroll-back-link"
            data-page={String(page - 1)}
            href={`/examples/infinite-scroll?page=${page - 1}`}
            hx-replace-url={`/examples/infinite-scroll?page=${page - 1}`}
            hx-get={`/examples/infinite-scroll/api?back&page=${page - 1}`}
            hx-swap="afterbegin"
            hx-target="next ul"
            hx-indicator="#infinite-scroll-back-link, #infinite-scroll-back-indicator"
            className="htmx-request-hide"
            _="
              on click on htmx:afterOnLoad
                decrement my @data-page

                if @data-page is less than 1
                  remove me
                else
                  set my @href to '/examples/infinite-scroll?page=' + my @data-page
                  set my @hx-replace-url to '/examples/infinite-scroll?page=' + my @data-page
                  set my @hx-get to '/examples/infinite-scroll/api?back&page=' + my @data-page
                  call htmx.process(me)
                end

              end
            "
          >
            Previous page
          </a>
          <span
            id="infinite-scroll-back-indicator"
            className="htmx-request-block"
          >
            Loading previous...
          </span>
        </p>
      )}

      <ul>
        {items.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            nextPage={index === items.length - 1 ? nextPage : undefined}
          />
        ))}
      </ul>
      <p id="infinite-scroll-indicator" className="htmx-request-block">
        Loading more...
      </p>
      <p id="infinite-scroll-next-link" className="htmx-request-hide">
        <a href={`/examples/infinite-scroll?page=${nextPage}`}>Next page</a>
      </p>
    </main>
  );
}
