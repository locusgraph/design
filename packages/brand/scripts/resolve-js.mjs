export async function resolve(specifier, context, nextResolve) {
  const relativeWithoutExtension = specifier.startsWith(".") && !/\.[a-z]+$/.test(specifier);
  return nextResolve(relativeWithoutExtension ? `${specifier}.js` : specifier, context);
}
