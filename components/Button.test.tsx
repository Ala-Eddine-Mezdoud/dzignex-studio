import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Button from "./Button";

describe("components/Button", () => {
  it("renders placeholder text", () => {
    render(<Button />);

    expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
