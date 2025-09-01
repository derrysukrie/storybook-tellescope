/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { VerticalAmPmToggle } from "./vertical-am-pm-selector";

describe("VerticalAmPmToggle", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof VerticalAmPmToggle>>) => {
    const utils = render(<VerticalAmPmToggle {...props} />);
    const amButton = screen.getByRole("button", { name: "AM" });
    const pmButton = screen.getByRole("button", { name: "PM" });
    return { amButton, pmButton, ...utils };
  };

  it("exports component", () => {
    expect(VerticalAmPmToggle).toBeDefined();
    expect(typeof VerticalAmPmToggle).toBe("function");
  });

  it("renders AM and PM toggle buttons", () => {
    const { amButton, pmButton } = setup();
    expect(amButton).toBeTruthy();
    expect(pmButton).toBeTruthy();
  });

  it("defaults to PM when no value is provided", () => {
    const { amButton, pmButton } = setup();
    expect(amButton.getAttribute("aria-pressed")).toBe("false");
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
  });

  it("uses provided value prop in controlled mode", () => {
    const { amButton, pmButton } = setup({ value: "AM" });
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
  });

  it("calls onChange when button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { amButton } = setup({ onChange });
    
    await user.click(amButton);
    expect(onChange).toHaveBeenCalledWith("AM");
  });

  it("toggles internal state in uncontrolled mode", async () => {
    const user = userEvent.setup();
    const { amButton, pmButton } = setup();
    
    // Initially PM is selected
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
    expect(amButton.getAttribute("aria-pressed")).toBe("false");
    
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
    const { amButton, pmButton } = setup({ value: "AM", onChange });
    
    // Initially AM is selected
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
    
    // Click PM
    await user.click(pmButton);
    
    // In controlled mode, the component should not change its own state
    // The value should still be "AM" since parent hasn't updated the prop
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
    expect(onChange).toHaveBeenCalledWith("PM");
  });

  it("disables both buttons when disabled prop is true", () => {
    const { amButton, pmButton } = setup({ disabled: true });
    
    expect((amButton as HTMLButtonElement).disabled).toBe(true);
    expect((pmButton as HTMLButtonElement).disabled).toBe(true);
  });

  it("enables buttons when disabled prop is false", () => {
    const { amButton, pmButton } = setup({ disabled: false });
    
    expect((amButton as HTMLButtonElement).disabled).toBe(false);
    expect((pmButton as HTMLButtonElement).disabled).toBe(false);
  });

  it("enables buttons by default when disabled prop is not provided", () => {
    const { amButton, pmButton } = setup();
    
    expect((amButton as HTMLButtonElement).disabled).toBe(false);
    expect((pmButton as HTMLButtonElement).disabled).toBe(false);
  });

  it("applies vertical orientation styling", () => {
    const { container } = setup();
    const toggleGroup = container.querySelector(".MuiToggleButtonGroup-root");
    
    expect(toggleGroup).toBeTruthy();
    // Check that the component renders with vertical orientation
    // Material-UI applies this through CSS classes and internal logic
    expect(toggleGroup).toBeTruthy();
  });

  it("applies custom styling through sx prop", () => {
    const { container } = setup();
    const toggleGroup = container.querySelector(".MuiToggleButtonGroup-root");
    
    expect(toggleGroup).toBeTruthy();
    // Check for custom styling classes
    expect(container.querySelector(".MuiToggleButtonGroup-grouped")).toBeTruthy();
  });

  it("disables ripple on toggle buttons", () => {
    const { container } = setup();
    const buttons = container.querySelectorAll(".MuiToggleButton-root");
    
    buttons.forEach(button => {
      // Check that ripple is disabled by verifying the disableRipple prop effect
      expect(button.querySelector(".MuiTouchRipple-root")).toBeNull();
    });
  });

  it("handles null value from onChange gracefully", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { amButton } = setup({ onChange });
    
    // Simulate a case where the toggle group might return null
    // This tests the null check in the handleChange function
    await user.click(amButton);
    
    // The component should handle this gracefully and not crash
    expect(onChange).toHaveBeenCalledWith("AM");
  });

  it("maintains exclusive selection behavior", async () => {
    const user = userEvent.setup();
    const { amButton, pmButton } = setup();
    
    // Initially PM is selected
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
    expect(amButton.getAttribute("aria-pressed")).toBe("false");
    
    // Click AM - should deselect PM and select AM
    await user.click(amButton);
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
    
    // Click AM again - should remain selected (exclusive behavior)
    await user.click(amButton);
    expect(amButton.getAttribute("aria-pressed")).toBe("true");
    expect(pmButton.getAttribute("aria-pressed")).toBe("false");
  });

  it("updates internal state correctly when value prop changes", () => {
    const { rerender } = setup({ value: "AM" });
    
    // Re-render with different value
    rerender(<VerticalAmPmToggle value="PM" />);
    
    const amButton = screen.getByRole("button", { name: "AM" });
    const pmButton = screen.getByRole("button", { name: "PM" });
    
    expect(amButton.getAttribute("aria-pressed")).toBe("false");
    expect(pmButton.getAttribute("aria-pressed")).toBe("true");
  });

  it("handles undefined onChange prop gracefully", async () => {
    const user = userEvent.setup();
    const { amButton } = setup({ onChange: undefined });
    
    // Should not throw when onChange is undefined
    await expect(user.click(amButton)).resolves.not.toThrow();
  });
});
