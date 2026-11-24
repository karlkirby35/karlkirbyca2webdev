import { describe, expect, test } from "vitest";

test("adds two numbers", () => {
  expect(2 + 2).toBe(4);
});

describe("matchers", () => {
  test("toBe compares numbers and strings", () => {
    expect(Math.max(3, 7)).toBe(7);
    expect("buy milk".toUpperCase()).toBe("BUY MILK");
  });

  test("toEqual compares what is inside objects and arrays", () => {
    expect({ id: 1, text: "Buy milk" }).toEqual({ id: 1, text: "Buy milk" });
    expect([1, 2, 3].map((n) => n * 2)).toEqual([2, 4, 6]);
  });

  test("other matchers", () => {
    expect(null).toBeNull();
    expect("Buy milk").toContain("milk");
    expect(["milk", "bread"]).toHaveLength(2);
    expect(Math.sqrt(16)).toBeGreaterThan(3);
    expect("Buy milk").not.toContain("eggs");
  });

  test("toThrow checks that a function throws an error", () => {
    expect(() => JSON.parse("not json")).toThrow();
  });
});
