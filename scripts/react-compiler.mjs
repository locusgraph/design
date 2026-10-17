import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { transformSync } from "@babel/core";
import transformReactJsx from "@babel/plugin-transform-react-jsx";
import reactCompiler from "babel-plugin-react-compiler";

const dist = resolve(process.argv[2] ?? "dist");
const failureEvents = new Set(["CompileError", "PipelineError"]);

function sourceFiles(folder) {
  return readdirSync(folder).flatMap((name) => {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return path.endsWith(".jsx") || path.endsWith(".js") ? [path] : [];
  });
}

function describeFailure(file, event) {
  const detail = event.detail;
  const reason = detail?.reason ?? detail?.options?.reason ?? event.data ?? event.kind;
  const line = event.fnLoc?.start?.line ?? detail?.loc?.start?.line ?? "?";
  return `${relative(dist, file)}:${line} ${reason}`;
}

const optOutDirective = /^\s*["']use no memo["']/m;
const clientDirective = /^\s*["']use client["']/;
const sources = new Map();

function optedOut(file, event) {
  const start = event.fnLoc?.start?.index;
  const end = event.fnLoc?.end?.index;
  if (start === undefined || end === undefined) return false;
  return optOutDirective.test(sources.get(file)?.slice(start, end) ?? "");
}

const failures = [];
let compiledFunctions = 0;
let compiledFiles = 0;

const logger = {
  logEvent(file, event) {
    if (event.kind === "CompileSuccess") compiledFunctions += 1;
    if (failureEvents.has(event.kind) && !optedOut(file, event)) {
      failures.push(describeFailure(file, event));
    }
  },
};

function compilerPlugins(source) {
  const jsx = [transformReactJsx, { runtime: "automatic" }];
  if (!clientDirective.test(source)) return [jsx];
  return [[reactCompiler, { target: "19", panicThreshold: "none", logger }], jsx];
}

function compile(file) {
  const before = compiledFunctions;
  sources.set(file, readFileSync(file, "utf8"));
  const result = transformSync(sources.get(file), {
    filename: file,
    babelrc: false,
    configFile: false,
    sourceType: "module",
    plugins: compilerPlugins(sources.get(file)),
  });
  const output = file.replace(/\.jsx$/, ".js");
  writeFileSync(output, `${result.code}\n`);
  if (output !== file) rmSync(file);
  if (compiledFunctions > before) compiledFiles += 1;
}

for (const file of sourceFiles(dist)) compile(file);

const serverFilesUsingCompiler = sourceFiles(dist).filter((file) => {
  const code = readFileSync(file, "utf8");
  return code.includes("react/compiler-runtime") && !clientDirective.test(code);
});
if (serverFilesUsingCompiler.length > 0) {
  console.error(
    'react-compiler: memoized files without "use client" break in React Server Components:'
  );
  for (const file of serverFilesUsingCompiler) console.error(`  ${relative(dist, file)}`);
  process.exit(1);
}

console.log(
  `react-compiler: ${compiledFunctions} components and hooks memoized in ${compiledFiles} files in ${dist}`
);
if (failures.length > 0) {
  console.error(`react-compiler: ${failures.length} components left uncompiled:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
