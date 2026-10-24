import { spawn, spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

const root = new URL("../../..", import.meta.url).pathname;
const registryDir = join(root, "apps/design/public");
const shadcn = ["dlx", "shadcn@4.21.1"];
const keepApp = process.argv.includes("--keep");
const batchSize = 12;

function run(command, args, cwd, env = {}) {
  console.log(`\n$ ${command} ${args.join(" ").slice(0, 160)}`);
  const child = spawn(command, args, {
    cwd,
    stdio: ["ignore", "inherit", "inherit"],
    env: { ...process.env, CI: "1", ...env },
  });
  return new Promise((resolve, reject) => {
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args[0]} failed with ${code}`))
    );
  });
}

function serve(dir) {
  const server = createServer((request, response) => {
    const file = join(dir, decodeURIComponent(request.url?.split("?")[0] ?? "/"));
    if (!file.startsWith(dir) || !existsSync(file)) {
      response.writeHead(404).end();
      return;
    }
    const type = extname(file) === ".json" ? "application/json" : "text/plain";
    response.writeHead(200, { "content-type": type }).end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

function allModulesPage(app) {
  const files = readdirSync(join(app, "components/locus")).filter((file) => /\.tsx?$/.test(file));
  const imports = files.map(
    (file, index) =>
      `import * as m${index} from "@/components/locus/${file.replace(/\.tsx?$/, "")}";`
  );
  const list = files.map((_file, index) => `m${index}`).join(", ");
  const page = `"use client";\n\n${imports.join("\n")}\n\nconst modules = [${list}];\n\nexport default function AllPage() {\n  return <main className="locus-eyebrow">{modules.length} modules</main>;\n}\n`;
  writeFileSync(join(app, "app/all/page.tsx"), page);
  return files.length;
}

const server = await serve(registryDir);
const base = `http://127.0.0.1:${server.address().port}`;
const app = mkdtempSync(join(tmpdir(), "locus-registry-"));
try {
  await run("node", ["scripts/registry/build.mjs"], root, { REGISTRY_BASE_URL: base });
  cpSync(join(import.meta.dirname, "template"), app, { recursive: true });
  await run("pnpm", ["install", "--silent"], app);
  await run(
    "pnpm",
    [...shadcn, "init", "-y", "-b", "radix", "-p", "nova", "--no-monorepo", "--no-rtl"],
    app
  );
  await run("pnpm", [...shadcn, "add", "button", "-y"], app);
  const config = JSON.parse(readFileSync(join(app, "components.json"), "utf8"));
  config.registries = { "@locus": `${base}/r/{name}.json` };
  writeFileSync(join(app, "components.json"), JSON.stringify(config, null, 2));
  const catalog = JSON.parse(readFileSync(join(registryDir, "r/registry.json"), "utf8"));
  const names = catalog.items.map((item) => `@locus/${item.name}`);
  for (let start = 0; start < names.length; start += batchSize) {
    await run(
      "pnpm",
      [...shadcn, "add", ...names.slice(start, start + batchSize), "-y", "--overwrite"],
      app
    );
  }
  const css = readFileSync(join(app, "app/globals.css"), "utf8");
  writeFileSync(
    join(app, "app/globals.css"),
    css.replace('@import "tailwindcss";', '@import "tailwindcss";\n@import "../styles/locus.css";')
  );
  mkdirSync(join(app, "app/all"), { recursive: true });
  const count = allModulesPage(app);
  await run("pnpm", ["typecheck"], app);
  await run("pnpm", ["build"], app);
  console.log(`\nregistry install test passed: ${names.length} items, ${count} files in ${app}`);
} finally {
  server.close();
  await run("node", ["scripts/registry/build.mjs"], root);
  if (!keepApp) spawnSync("rm", ["-rf", app]);
}
