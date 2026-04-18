import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders with default data attributes", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("data-variant", "default");
    expect(button).toHaveAttribute("data-size", "default");
  });

  it("calls click handlers", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Submit</Button>);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports rendering as a child element", () => {
    render(
      <Button asChild>
        <a href="/pricing">Pricing</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Pricing" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("data-variant", "default");
  });
});
