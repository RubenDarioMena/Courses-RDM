import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const staticOnly = process.argv.includes("--static");
const root = fileURLToPath(
  new URL(staticOnly ? "../dist/" : "../", import.meta.url),
);
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".py": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".wasm": "application/wasm",
};
const publicRoots = [
  "arena",
  "Curso_HTML_CSS_JS",
  "Curso_bug_tool_project",
  "Design_System",
  "Old_references",
];
const publicFiles = [
  "index.html",
  "DESIGN_SYSTEM_SPEC.md",
  "bugtool1",
  "bugtool1.png",
  "bugtool2.png",
];
const vite = staticOnly
  ? null
  : await createServer({ server: { middlewareMode: true }, appType: "mpa" });
http
  .createServer(async (req, res) => {
    if (
      vite &&
      (req.url.startsWith("/arena/") ||
        req.url.startsWith("/@") ||
        req.url.startsWith("/node_modules/"))
    ) {
      vite.middlewares(req, res, () => {
        res.writeHead(404);
        res.end("No encontrado");
      });
      return;
    }
    try {
      const url = new URL(req.url, `http://localhost:${port}`);
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405);
        res.end();
        return;
      }
      const relative =
        decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
      if (
        !publicRoots.includes(relative.split("/")[0]) &&
        !publicFiles.includes(relative)
      ) {
        res.writeHead(404);
        res.end("No encontrado");
        return;
      }
      let target = path.resolve(root, relative);
      if (
        !target.startsWith(root) ||
        relative
          .split("/")
          .some((part) => part.startsWith(".") || part === "..")
      ) {
        res.writeHead(403);
        res.end();
        return;
      }
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      res.writeHead(200, {
        "Content-Type":
          types[path.extname(target)] ?? "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(req.method === "HEAD" ? "" : await readFile(target));
    } catch {
      res.writeHead(404);
      res.end("No encontrado");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Arena local: http://localhost:${port}/arena/`),
  );
