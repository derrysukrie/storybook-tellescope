/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render } from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import TableFooter from "./table-footer";

const renderWithTheme = render;

describe("TableFooter", () => {
  it("renders with default props and shows icon when no children", () => {
    const { container } = renderWithTheme(<TableFooter />);
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toBeTruthy();
    // Icon rendered when no children
    const svg = container.querySelector(".MuiSvgIcon-root");
    expect(svg).toBeInTheDocument();
  });

  it("renders COUNT ALL and children when provided", () => {
    const { getByText, container } = renderWithTheme(<TableFooter>42</TableFooter>);
    expect(getByText("COUNT ALL")).toBeInTheDocument();
    expect(getByText("42")).toBeInTheDocument();
    // No icon when children exist
    expect(container.querySelector(".MuiSvgIcon-root")).toBeNull();
  });

  it("merges sx styles on the TableCell", () => {
    const { container } = renderWithTheme(
      <TableFooter sx={{ backgroundColor: "red" }} />
    );
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("allows overriding align via rest props", () => {
    const { container } = renderWithTheme(
      <TableFooter align="left" />
    );
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toHaveClass("MuiTableCell-alignLeft");
  });
});