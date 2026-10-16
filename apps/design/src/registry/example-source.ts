function dedent(source: string) {
  const lines = source.split("\n");
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^ */)?.[0].length ?? 0);
  const smallestIndent = Math.min(...indents);
  return lines.map((line) => line.slice(smallestIndent)).join("\n");
}

function functionBody(fileSource: string, functionName: string) {
  const start = fileSource.search(new RegExp(`^function ${functionName}\\(`, "m"));
  if (start === -1) {
    return null;
  }
  const bodyStart = fileSource.indexOf("{\n", start) + 2;
  const bodyEnd = fileSource.indexOf("\n}", bodyStart);
  return fileSource.slice(bodyStart, bodyEnd);
}

export function extractExampleSource(fileSource: string, functionName: string) {
  const body = functionBody(fileSource, functionName);
  if (body === null) {
    return "";
  }
  const returnedJsx = body.match(/^ {2}return \(\n([\s\S]*)\n {2}\);$/m);
  if (returnedJsx) {
    return dedent(returnedJsx[1] ?? "").trim();
  }
  const returnedLine = body.match(/^ {2}return (<[\s\S]*>);$/m);
  return dedent(returnedLine ? (returnedLine[1] ?? "") : body).trim();
}

export function titleFromName(functionName: string) {
  return functionName.replace(/([a-z])([A-Z])/g, "$1 $2");
}
