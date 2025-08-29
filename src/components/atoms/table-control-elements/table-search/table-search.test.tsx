/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TableSearch from "./table-search";

const renderWithTheme = render;

describe("TableSearch", () => {
  it("renders with default props (collapsed shows icon button)", () => {
    const { container } = renderWithTheme(<TableSearch />);
    // Should render an IconButton with a search icon
    const icon = container.querySelector(".MuiSvgIcon-root");
    expect(icon).toBeInTheDocument();
  });

  it("collapsed and value set returns null (no icon)", () => {
    const { container } = renderWithTheme(<TableSearch value="abc" />);
    expect(container.firstChild).toBeNull();
  });

  it("expanded renders input with placeholder and icons", () => {
    const { getByPlaceholderText, container } = renderWithTheme(
      <TableSearch expanded value="" />
    );
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
    // start and end icons exist
    const icons = container.querySelectorAll(".MuiSvgIcon-root");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("typing calls onChange with new value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <TableSearch expanded value="" onChange={onChange} />
    );
    const input = getByPlaceholderText("Search") as HTMLInputElement;
    await user.type(input, "hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("clear button clears the value via onChange('') and disables when empty", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container, rerender } = renderWithTheme(
      <TableSearch expanded value="pizza" onChange={onChange} />
    );

    // clear button should be enabled when value present
    const clearBtn = container.querySelector(".MuiIconButton-root");
    expect(clearBtn).toBeInTheDocument();
    await user.click(clearBtn as HTMLElement);
    expect(onChange).toHaveBeenCalledWith("");

    // When value empty, button becomes disabled
    rerender(<TableSearch expanded value="" onChange={onChange} />);
    const disabledClear = container.querySelector(".MuiIconButton-root[disabled]");
    expect(disabledClear).toBeInTheDocument();
  });
});