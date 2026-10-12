import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "vite";
const root = fileURLToPath(new URL("../", import.meta.url));
const destination = path.join(root, "dist");
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
const publishable = (source) =>
  !path
    .relative(root, source)
    .split(path.sep)
    .some(
      (part) =>
        [".git", ".DS_Store", "__pycache__"].includes(part) ||
        part.startsWith(".env") ||
        part.startsWith(".~") ||
        part.startsWith("~$") ||
        part.endsWith(".pyc"),
    );
for (const item of [
  "index.html",
  "Curso_HTML_CSS_JS",
  "Curso_bug_tool_project",
  "Design_System",
  "Old_references",
  "DESIGN_SYSTEM_SPEC.md",
  "bugtool1",
  "bugtool1.png",
  "bugtool2.png",
])
  await cp(path.join(root, item), path.join(destination, item), {
    recursive: true,
    filter: publishable,
  });
await build();
console.log("Arena Factory y cursos existentes preparados en dist/.");
