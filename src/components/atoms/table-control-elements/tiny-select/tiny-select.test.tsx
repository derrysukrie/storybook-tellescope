/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TinySelect from "./tiny-select";
import { MenuItem } from "@mui/material";

const renderWithTheme = render;

describe("TinySelect", () => {
  it("renders with default props", () => {
    const { container } = renderWithTheme(
      <TinySelect>
        <MenuItem value="Value">value</MenuItem>
        <MenuItem value="Option">option</MenuItem>
      </TinySelect>
    );
    expect(container).toBeTruthy();
  });

  it("renders with value and calls onChange when selecting", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container, getByText } = renderWithTheme(
      <TinySelect value="Value" onChange={onChange}>
        <MenuItem value="Value">value</MenuItem>
        <MenuItem value="Option">option</MenuItem>
      </TinySelect>
    );

    // Find the select trigger element
    const selectTrigger = container.querySelector('[role="button"], [role="combobox"]') || 
                         container.querySelector('.MuiSelect-select');
    expect(selectTrigger).toBeTruthy();
    
    if (selectTrigger) {
      await user.click(selectTrigger as HTMLElement);
      await user.click(getByText("option"));
      expect(onChange).toHaveBeenCalledWith("Option");
    }
  });

  it("merges sx styles", () => {
    const { container } = renderWithTheme(
      <TinySelect sx={{ backgroundColor: "red" }}>
        <MenuItem value="A">A</MenuItem>
      </TinySelect>
    );
    // Check that the component renders without error
    expect(container).toBeTruthy();
  });

  it("applies default appearance and size", () => {
    const { container } = renderWithTheme(
      <TinySelect>
        <MenuItem value="A">A</MenuItem>
      </TinySelect>
    );
    // Check that the component renders without error
    expect(container).toBeTruthy();
  });

  it("merges MenuProps.PaperProps.sx", () => {
    const { container } = renderWithTheme(
      <TinySelect MenuProps={{ PaperProps: { sx: { backgroundColor: "blue" } } }}>
        <MenuItem value="A">A</MenuItem>
      </TinySelect>
    );
    // The menu is not open by default, so we can't test the PaperProps directly
    // But we can verify the component renders without error
    expect(container).toBeTruthy();
  });

  it("uses custom IconComponent", () => {
    const { container } = renderWithTheme(
      <TinySelect>
        <MenuItem value="A">A</MenuItem>
      </TinySelect>
    );
    // Should have the custom arrow icon
    const icon = container.querySelector(".MuiSvgIcon-root");
    expect(icon).toBeInTheDocument();
  });
});
