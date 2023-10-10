import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix + HTMX + Hyperscript" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="main">
      <h1>Revitalize Web Development with HTML & HTTP</h1>
      <p>
        Pair HTMX for seamless client-side navigation and view transitions with
        Hyperscript's on-the-go client-side interactivity. The result? A
        developer toolkit that optimizes both the developer's and user's
        experience, grounded in the time-tested principles of HTML and HTTP.
      </p>

      <h2>React for Server Templating: A HATEOAS Affair</h2>
      <p>
        React, predominantly recognized for client-side rendering, can be an
        optimal choice for server-side templating, especially when aligned with
        HATEOAS (Hypermedia as the Engine of Application State) principles.
      </p>
      <p>
        Utilizing React (Remix) on the server allows you to take advantage of
        nested routes and dynamic data fetching, while also providing a familiar
        and powerful server environment for "frontend developers" to dip their
        toes into the wonderful world of servers!
      </p>
      <p>
        HATEOAS, an essential constraint of REST, ensures that the client
        interacts with the server purely through hypermedia provided dynamically
        by server-side applications. With React's server-side rendering (SSR),
        we can provide these dynamic hypermedia links directly in the rendered
        HTML. This results in a system where the client doesn't need prior
        knowledge about how to interact with an application beyond a generic
        understanding of hypermedia (i.e, it's ability to render HTML).
      </p>

      <h2>What about interactivity???</h2>
      <p>
        In the evolving landscape of web development, there's a growing
        inclination towards lean and efficient solutions. While React, coupled
        with various third-party libraries, offers a robust ecosystem, it often
        comes at the cost of performance overhead, especially for applications
        that don't require its full-fledged capabilities.
      </p>
      <p>
        Enter Hyperscript. It offers an elegant way to introduce bits of
        interactivity to your web pages without the need for hefty JavaScript
        frameworks or libraries.
      </p>
      <p>
        With Hyperscript, you're leveraging a concise scripting language
        designed specifically for enhancing the user experience with interactive
        features. It allows for direct integration within HTML, making it a
        natural fit for developers who prioritize performance and simplicity.
      </p>
      <p>
        By choosing Hyperscript over shipping React and other third-party
        libraries, you're ensuring faster load times, reduced network payload,
        and an overall optimized user experience, especially for applications
        where "sprinkles" of interactivity suffice. Don't think you're limited
        to sprinkles, though. Hyperscript is a full-fledged scripting language
        and integrates seamlessly with the many other event-driven libraries.
      </p>

      <p>
        <button
          type="button"
          _="
            on click
              set counter to the next <span/>
              decrement counter.innerText by 1
            end
          "
        >
          -
        </button>{" "}
        Count: <span>1</span>{" "}
        <button
          type="button"
          _="
            on click
              set counter to the previous <span/>
              increment counter.innerText by 1
            end
          "
        >
          +
        </button>
      </p>

      <pre className="box overflow:auto">
        <code>{`<p>
  <button
    type="button"
    _="
      on click
        set counter to the next <span/>
        decrement counter.innerText by 1
      end
    "
  >
    -
  </button>{" "}
  Count: <span>1</span>{" "}
  <button
    type="button"
    _="
      on click
        set counter to the previous <span/>
        increment counter.innerText by 1
      end
    "
  >
    +
  </button>
</p>`}</code>
      </pre>
    </main>
  );
}
