import * as fs from "node:fs/promises";
import * as os from "node:os";

import fg from "fast-glob";
import * as pagefind from "pagefind";

const { index } = await pagefind.createIndex();

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const concurrency = os.cpus().length;
const awaitingTurn = new Map();
async function myTurn(callback) {
  if (awaitingTurn.size >= concurrency) {
    const deferred = new Deferred();
    awaitingTurn.add(callback, deferred);
    return deferred.promise;
  }

  const promise = callback();

  promise.finally(() => {
    if (awaitingTurn.size > 0) {
      const [callback, deferred] = awaitingTurn.entries().next().value;
      awaitingTurn.delete(callback);
      callback().then(deferred.resolve).catch(deferred.reject);
    }
  });

  return promise;
}

async function indexFile(site, file) {
  file = file.replace(/\\/g, "/");
  file = file.slice(`search/${site}/`.length);
  let pathname = file;
  if (file.endsWith("/index.html")) {
    pathname = file.slice(0, -"index.html".length);
  } else {
    pathname = file.replace(/\.html$/, "");
  }
  await index.addHTMLFile({
    content: await fs.readFile(`search/${site}/${file}`, "utf8"),
    url: `/redirect?${new URLSearchParams([
      ["location", `https://${site}/${pathname}`],
    ])}`,
  });
  console.log(`Indexed https://${site}/${pathname}`);
}

async function indexSite(site) {
  const promises = [];
  let files = fg.globStream(`search/${site}/**/*.html`);
  for await (let file of files) {
    promises.push(myTurn(indexFile.bind(null, site, file)));
  }
  return promises;
}

await Promise.all([
  indexSite("remix.run"),
  indexSite("htmx.org"),
  indexSite("htmx.dev"),
]);

await index.writeFiles({
  outputPath: "public/pagefind",
});
