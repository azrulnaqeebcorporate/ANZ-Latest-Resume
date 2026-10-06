import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { force: true, recursive: true });
mkdirSync("dist");

for (const entry of ["assets", "content.js", "index.html", "script.js", "styles.css", "Azrul-Naqeeb-Portfolio.pdf"]) {
  cpSync(entry, `dist/${entry}`, { recursive: true });
}
