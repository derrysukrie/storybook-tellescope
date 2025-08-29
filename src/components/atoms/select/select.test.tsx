/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import Select from "./select";
import { MenuItem } from "@mui/material";
import userEvent from "@testing-library/user-event";

const renderWithTheme = render;

describe("Select", () => {
  it("exports component", () => {
    expect(Select).toBeDefined();
    expect(typeof Select).toBe("function");
  });

  it("renders label when not hidden", () => {
    const { getByText } = renderWithTheme(
      <Select label="Status" value="Open" onChange={vi.fn()}>
        <MenuItem value="Open">Open</MenuItem>
      </Select>
    );
    expect(getByText("Status")).toBeTruthy();
  });

  it("hides label when hiddenLabel is true", () => {
    const { queryByText } = renderWithTheme(
      <Select label="Status" hiddenLabel value="Open" onChange={vi.fn()}>
        <MenuItem value="Open">Open</MenuItem>
      </Select>
    );
    expect(queryByText("Status")).toBeNull();
  });

  it("renders helperText when provided", () => {
    const { getByText } = renderWithTheme(
      <Select label="State" value="A" onChange={vi.fn()} helperText="Required" error>
        <MenuItem value="A">A</MenuItem>
      </Select>
    );
    expect(getByText("Required")).toBeTruthy();
  });

  it("renders chips for multiple selected values", () => {
    const values = ["One", "Two", "Three"];
    const { container } = renderWithTheme(
      <Select label="Tags" multiple value={values} onChange={vi.fn()} appearance="table">
        {values.map(v => (
          <MenuItem key={v} value={v}>{v}</MenuItem>
        ))}
      </Select>
    );
    const chips = container.querySelectorAll(".MuiChip-root");
    expect(chips.length).toBe(3);
  });

  it("calls onChange when deleting a chip in multiple mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = renderWithTheme(
      <Select label="Tags" multiple value={["Red", "Blue"]} onChange={onChange} appearance="table">
        <MenuItem value="Red">Red</MenuItem>
        <MenuItem value="Blue">Blue</MenuItem>
      </Select>
    );
    const deleteIcon = container.querySelector(".MuiChip-root .MuiChip-deleteIcon");
    expect(deleteIcon).toBeTruthy();
    if (deleteIcon) {
      await user.click(deleteIcon as HTMLElement);
      expect(onChange).toHaveBeenCalledTimes(1);
    }
  });

  it("opens menu and allows selecting an option (single)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole, getByText, container } = renderWithTheme(
      <Select label="Priority" value="Low" onChange={onChange}>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>
    );

    // MUI Select may expose role as combobox or button depending on variant
    let trigger: HTMLElement | null = null;
    try {
      trigger = getByRole("combobox", { name: /priority/i });
    } catch {
      try {
        trigger = getByRole("button", { name: /priority/i });
      } catch {
        trigger = container.querySelector('[role="combobox"], [role="button"]') as HTMLElement | null;
      }
    }

    expect(trigger).toBeTruthy();
    if (!trigger) return;

    await user.click(trigger);
    await user.click(getByText("High"));
    expect(onChange).toHaveBeenCalled();
  });
});
