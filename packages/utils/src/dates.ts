const mediumDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

export function formatDate(value: string | number | Date | null | undefined, empty = ""): string {
  if (value === null || value === undefined) {
    return empty;
  }
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? empty : mediumDate.format(date);
}
