import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, sep } from "node:path";

const root = process.cwd();
const port = Number(process.argv[2]) || 8080;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8",
};

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/") pathname = "/index.html";

    const file = normalize(join(root, pathname));
    if (!file.startsWith(root + sep) && file !== root) {
      res.writeHead(403).end("403 Forbidden");
      return;
    }
    if (!existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404).end("404 Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": types[extname(file).toLowerCase()] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
