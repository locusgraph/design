const countFormat = new Intl.NumberFormat("en-US");

export function formatCount(value: number): string {
  return countFormat.format(value);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatCount(count)} ${count === 1 ? singular : plural}`;
}
