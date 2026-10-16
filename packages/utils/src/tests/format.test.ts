import { describe, expect, it } from "vitest";
import { formatDate } from "../dates";
import { balanceLevel, centsToMicroUsd, formatCents, formatMicroUsd } from "../money";
import { formatCount, pluralize } from "../numbers";

describe("money", () => {
  it("formats cents as dollars", () => {
    expect(formatCents(4000)).toBe("$40.00");
    expect(formatCents(0)).toBe("$0.00");
  });

  it("shows sub-cent micro-USD to four places and whole cents to two", () => {
    expect(formatMicroUsd(1_000_000)).toBe("$1.00");
    expect(formatMicroUsd(1_234_500)).toBe("$1.2345");
    expect(formatMicroUsd(-300_000)).toBe("-$0.30");
  });

  it("converts cents to micro-USD", () => {
    expect(centsToMicroUsd(1000)).toBe(10_000_000);
  });
});

describe("numbers", () => {
  it("groups thousands and pluralizes", () => {
    expect(formatCount(10450)).toBe("10,450");
    expect(pluralize(1, "key")).toBe("1 key");
    expect(pluralize(0, "key")).toBe("0 keys");
    expect(pluralize(2, "entry", "entries")).toBe("2 entries");
  });
});

describe("dates", () => {
  it("formats a medium date in UTC and falls back when empty or invalid", () => {
    expect(formatDate("2026-11-15T12:00:00.000Z")).toBe("Nov 15, 2026");
    expect(formatDate(null, "Never")).toBe("Never");
    expect(formatDate("not a date", "—")).toBe("—");
  });
});

describe("balance level", () => {
  it("is empty at or below zero, low under two dollars, fine above", () => {
    expect(balanceLevel(0)).toBe("empty");
    expect(balanceLevel(-1)).toBe("empty");
    expect(balanceLevel(1_000_000)).toBe("low");
    expect(balanceLevel(2_000_000)).toBe("fine");
    expect(balanceLevel(5_000_000, 10_000_000)).toBe("low");
  });
});
