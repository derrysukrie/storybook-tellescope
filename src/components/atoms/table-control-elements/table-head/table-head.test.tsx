/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render } from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import TableHead from "./table-head";

const renderWithTheme = render;

describe("TableHead", () => {
  it("renders with default props", () => {
    const { container } = renderWithTheme(<TableHead />);
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toBeTruthy();
  });

  it("renders children text", () => {
    const { getByText } = renderWithTheme(<TableHead>Header</TableHead>);
    expect(getByText("Header")).toBeInTheDocument();
  });

  it("renders checkbox when checkbox=true", () => {
    const { container } = renderWithTheme(<TableHead checkbox>H</TableHead>);
    const checkbox = container.querySelector(".MuiCheckbox-root, input[type='checkbox']");
    expect(checkbox).toBeTruthy();
  });

  it("uses small size for checkbox when small=true", () => {
    const { container } = renderWithTheme(<TableHead checkbox small>H</TableHead>);
    // MUI applies sizeSmall class to checkbox root when size="small"
    const smallClass = container.querySelector(".MuiCheckbox-root.MuiCheckbox-sizeSmall");
    expect(smallClass).toBeTruthy();
  });

  it("shows star icon on left when icon='left'", () => {
    const { container } = renderWithTheme(<TableHead icon="left">H</TableHead>);
    const icons = container.querySelectorAll(".MuiSvgIcon-root");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("shows star icon on right when icon='right'", () => {
    const { container } = renderWithTheme(<TableHead icon="right">H</TableHead>);
    const icons = container.querySelectorAll(".MuiSvgIcon-root");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("no icon when icon='none'", () => {
    const { container } = renderWithTheme(<TableHead icon="none">H</TableHead>);
    const icons = container.querySelectorAll(".MuiSvgIcon-root");
    expect(icons.length).toBe(0);
  });

  it("merges sx styles on TableCell", () => {
    const { container } = renderWithTheme(
      <TableHead sx={{ backgroundColor: "red" }}>H</TableHead>
    );
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("allows overriding align via rest props", () => {
    const { container } = renderWithTheme(
      <TableHead align="left">H</TableHead>
    );
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toHaveClass("MuiTableCell-alignLeft");
  });
});
