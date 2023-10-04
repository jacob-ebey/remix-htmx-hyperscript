import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const location = url.searchParams.get("location");
  if (!location) {
    throw new Error("No location provided");
  }

  return redirect(location);
}
