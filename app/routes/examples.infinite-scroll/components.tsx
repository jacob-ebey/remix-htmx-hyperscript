import { type AriaAttributes } from "react";

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
