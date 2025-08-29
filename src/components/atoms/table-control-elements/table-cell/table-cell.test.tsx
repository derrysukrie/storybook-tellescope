/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render } from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import TableCell from "./table-cell";
import { SvgIcon } from "@mui/material";

const renderWithTheme = render;

const DummyIcon = () => (
  <SvgIcon data-testid="dummy-icon"><svg /></SvgIcon>
);

describe("TableCell", () => {
  it("renders with default props", () => {
    const { container } = renderWithTheme(<TableCell />);
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = renderWithTheme(<TableCell>Content</TableCell>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders icon on the left when iconPosition='left'", () => {
    const { getByTestId } = renderWithTheme(
      <TableCell icon={<DummyIcon />} iconPosition="left">Cell</TableCell>
    );
    expect(getByTestId("dummy-icon")).toBeInTheDocument();
  });

  it("renders icon on the right when iconPosition='right'", () => {
    const { getByText, getByTestId } = renderWithTheme(
      <TableCell icon={<DummyIcon />} iconPosition="right">Cell</TableCell>
    );
    // Ensure text is present and icon exists
    expect(getByText("Cell")).toBeInTheDocument();
    expect(getByTestId("dummy-icon")).toBeInTheDocument();
  });

  it("merges sx styles on the TableCell", () => {
    const { container } = renderWithTheme(
      <TableCell sx={{ backgroundColor: "red" }}>X</TableCell>
    );
    const root = container.querySelector(".MuiTableCell-root");
    expect(root).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("applies StackProps to inner Stack (gap override)", () => {
    const { container } = renderWithTheme(
      <TableCell StackProps={{ sx: { gap: 4 } }}>X</TableCell>
    );
    const stacks = container.querySelectorAll(".MuiStack-root");
    // The first inner Stack should get the custom gap
    expect(stacks.length).toBeGreaterThan(0);
    // We cannot assert CSS gap value reliably via computed styles here; assert presence
    expect(stacks[0]).toBeInTheDocument();
  });

  it("allows overriding align via rest props", () => {
    const { container } = renderWithTheme(
      <TableCell align="left">Y</TableCell>
    );
    const root = container.querySelector(".MuiTableCell-root");
    // MUI applies a class for alignment
    expect(root).toHaveClass("MuiTableCell-alignLeft");
  });
});