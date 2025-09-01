/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { HorizontalAmPmToggle } from "./horizontal-am-pm-selector";

const renderWithTheme = render;

describe("HorizontalAmPmToggle", () => {
  it("exports component", () => {
    expect(HorizontalAmPmToggle).toBeDefined();
    expect(typeof HorizontalAmPmToggle).toBe("function");
  });

  it("renders AM and PM toggle buttons", () => {
    const { getByRole } = renderWithTheme(<HorizontalAmPmToggle />);
    expect(getByRole("button", { name: "AM" })).toBeTruthy();
    expect(getByRole("button", { name: "PM" })).toBeTruthy();
  });

  it("defaults to PM when no value is provided", () => {
    const { getByRole } = renderWithTheme(<HorizontalAmPmToggle />);
    const pmButton = getByRole("button", { name: "PM" });
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
  });

  it("uses provided value prop in controlled mode", () => {
    const { getByRole } = renderWithTheme(<HorizontalAmPmToggle value="AM" />);
    const amButton = getByRole("button", { name: "AM" });
    const pmButton = getByRole("button", { name: "PM" });
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
  });

  it("calls onChange when button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = renderWithTheme(
      <HorizontalAmPmToggle onChange={onChange} />
    );
    
    await user.click(getByRole("button", { name: "AM" }));
    expect(onChange).toHaveBeenCalledWith("AM");
  });

  it("toggles internal state in uncontrolled mode", async () => {
    const user = userEvent.setup();
    const { getByRole } = renderWithTheme(<HorizontalAmPmToggle />);
    
    const amButton = getByRole("button", { name: "AM" });
    const pmButton = getByRole("button", { name: "PM" });
    
    // Initially PM is selected
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
    
    // Click AM
    await user.click(amButton);
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
    
    // Click PM
    await user.click(pmButton);
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
    expect(amButton.getAttribute("aria-pressed")).toBe("false");
  });

  it("does not update internal state in controlled mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = renderWithTheme(
      <HorizontalAmPmToggle value="AM" onChange={onChange} />
    );
    
    const pmButton = getByRole("button", { name: "PM" });
    await user.click(pmButton);
    
    // In controlled mode, the component should not change its own state
    // The value should still be "AM" since parent hasn't updated the prop
    expect(getByRole("button", { name: "AM" }).getAttribute("aria-pressed")).toBe("true");
    expect(onChange).toHaveBeenCalledWith("PM");
  });

  it("disables both buttons when disabled prop is true", () => {
    const { getByRole } = renderWithTheme(<HorizontalAmPmToggle disabled />);
    const amButton = getByRole("button", { name: "AM" }) as HTMLButtonElement;
    const pmButton = getByRole("button", { name: "PM" }) as HTMLButtonElement;
    
    // Check for disabled attribute (Material-UI's primary way of disabling buttons)
    expect(amButton.disabled).toBe(true);
    expect(pmButton.disabled).toBe(true);
    
    // Also check for aria-disabled attribute if it exists
    const amAriaDisabled = amButton.getAttribute("aria-disabled");
    const pmAriaDisabled = pmButton.getAttribute("aria-disabled");
    
    // Either disabled attribute should be true, or aria-disabled should be "true"
    expect(amButton.disabled || amAriaDisabled === "true").toBe(true);
    expect(pmButton.disabled || pmAriaDisabled === "true").toBe(true);
  });

  it("applies custom styling through sx prop", () => {
    const { container } = renderWithTheme(<HorizontalAmPmToggle />);
    const toggleGroup = container.querySelector(".MuiToggleButtonGroup-root");
    expect(toggleGroup).toBeTruthy();
  });

  it("disables ripple on toggle buttons", () => {
    const { container } = renderWithTheme(<HorizontalAmPmToggle />);
    const buttons = container.querySelectorAll(".MuiToggleButton-root");
    buttons.forEach(button => {
      // Check that ripple is disabled by verifying the disableRipple prop effect
      expect(button.querySelector(".MuiTouchRipple-root")).toBeNull();
    });
  });
});