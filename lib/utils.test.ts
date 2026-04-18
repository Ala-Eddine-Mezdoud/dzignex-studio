import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("resolves Tailwind conflicts by keeping the last class", () => {
    expect(cn("px-2", "px-6", "text-sm", "text-lg")).toBe("px-6 text-lg");
  });

  it("handles conditional values", () => {
    expect(cn("base", false && "hidden", "active")).toBe("base active");
  });
});
