import { readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { transformFileSync } from "@babel/core";
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

const failures = [];
let compiledFunctions = 0;
let compiledFiles = 0;

const logger = {
  logEvent(file, event) {
    if (event.kind === "CompileSuccess") compiledFunctions += 1;
    if (failureEvents.has(event.kind)) failures.push(describeFailure(file, event));
  },
};

function compile(file) {
  const before = compiledFunctions;
  const result = transformFileSync(file, {
    babelrc: false,
    configFile: false,
    sourceType: "module",
    plugins: [
      [reactCompiler, { target: "19", panicThreshold: "none", logger }],
      [transformReactJsx, { runtime: "automatic" }],
    ],
  });
  const output = file.replace(/\.jsx$/, ".js");
  writeFileSync(output, `${result.code}\n`);
  if (output !== file) rmSync(file);
  if (compiledFunctions > before) compiledFiles += 1;
}

for (const file of sourceFiles(dist)) compile(file);

console.log(
  `react-compiler: ${compiledFunctions} components and hooks memoized in ${compiledFiles} files in ${dist}`
);
if (failures.length > 0) {
  console.error(`react-compiler: ${failures.length} components left uncompiled:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
