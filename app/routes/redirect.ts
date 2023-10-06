import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const location = url.searchParams.get("location");
  if (
    !location ||
    (!location.startsWith("https://htmx.org/") &&
      !location.startsWith("https://hyperscript.org/") &&
      !location.startsWith("https://remix.run/"))
  ) {
    throw new Error("Invalid location provided");
  }

  return redirect(location);
}
