import http from "node:http";
import fs from "node:fs/promises";

const port = 8080;
const server = http.createServer();

const resources = {
  "/": { file: "index.html", type: "text/html" },
  "/about": { file: "about.html", type: "text/html" },
  "/contact-me": { file: "contact-me.html", type: "text/html" },
  "/styles.css": { file: "styles.css", type: "text/css" },
};

server.on("request", async (request, response) => {
  console.log(`request: ${request.method} ${request.url}`);

  let resource, code;

  resource = resources[request.url];

  if (resource === undefined) {
    resource = { file: "404.html", type: "text/html" };
    code = 404;
  } else {
    code = 200;
  }

  try {
    const content = await fs.readFile(resource.file, { encoding: "utf8" });

    response.writeHead(code, {
      "Content-Type": resource.type,
      "Content-Length": content.length,
    });
    response.end(content);
  } catch (error) {
    console.error(`error: ${error.message}`);
    response.writeHead(500);
    response.end();
  }
});

server.on("error", (error) => {
  console.error(`error: ${error.message}`);
});

server.listen(port);
