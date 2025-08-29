/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Reset from "./reset";

const renderWithTheme = render;

describe("Reset", () => {
  it("renders with default props", () => {
    const { getByText } = renderWithTheme(<Reset />);
    expect(getByText("Reset")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { getByText } = renderWithTheme(<Reset onClick={onClick} />);
    const resetEl = getByText("Reset");
    await user.click(resetEl);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});