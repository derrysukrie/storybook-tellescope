import { describe, it, expect } from "vitest";
import { render} from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import {Page} from "./Page";

const renderWithTheme = render;

describe("Page", () => {
  it("renders correctly", () => {
    const { container } = renderWithTheme(<Page truncated={false} />);
    const pageElement = container.querySelector(".MuiBox-root");
    expect(pageElement).toBeInTheDocument();
  });

  it("renders with truncate props", () => {
    const { container } = renderWithTheme(<Page truncated />);
    const pageElement = container.querySelector(".MuiBox-root");
    expect(pageElement).toHaveClass("MuiBox-root");
  });

  it("renders with not truncated props", () => {
    const { container } = renderWithTheme(<Page truncated={false} />);
    const pageElement = container.querySelector(".MuiBox-root");
    expect(pageElement).not.toHaveClass("MuiBox-root");
  });
});