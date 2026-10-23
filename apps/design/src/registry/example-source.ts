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

const properNames: Record<string, string> = {
  LocusGraph: "LocusGraph",
  SpendGraph: "SpendGraph",
  OpenGraph: "Open Graph",
  Html: "HTML",
};

const namePart = /LocusGraph|SpendGraph|OpenGraph|[A-Z]+(?![a-z])|[A-Z][a-z]*|[a-z]+|\d+/g;

function sentenceWord(word: string, position: number) {
  const proper = properNames[word];
  if (proper) return proper;
  const isAcronym = word.length > 1 && word === word.toUpperCase();
  return position === 0 || isAcronym ? word : word.toLowerCase();
}

export function titleFromName(functionName: string) {
  return (functionName.match(namePart) ?? [functionName]).map(sentenceWord).join(" ");
}
