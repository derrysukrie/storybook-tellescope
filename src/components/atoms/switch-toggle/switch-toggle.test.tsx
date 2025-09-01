/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SwitchToggle from "./switch-toggle";

const renderWithTheme = render;

describe("SwitchToggle", () => {
  it("exports component", () => {
    expect(SwitchToggle).toBeDefined();
    expect(typeof SwitchToggle).toBe("function");
  });

  it("renders with label and associates it with the switch", () => {
    const { getByRole } = renderWithTheme(
      <SwitchToggle label="Enable feature" name="feature" />
    );
    const checkbox = getByRole("checkbox", { name: /enable feature/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("name", "feature");
  });

  it("uncontrolled: respects defaultChecked and toggles internal state", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole } = renderWithTheme(
      <SwitchToggle label="Notifications" defaultChecked onChange={onChange} />
    );
    const checkbox = getByRole("checkbox", { name: /notifications/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBe(false);
  });

  it("controlled: uses external checked value and does not change without prop update", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { getByRole, rerender } = renderWithTheme(
      <SwitchToggle label="Dark Mode" checked={true} onChange={onChange} />
    );
    const checkbox = getByRole("checkbox", { name: /dark mode/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    // Still true because it's controlled and parent didn't change prop
    expect(checkbox.checked).toBe(true);

    // Parent updates prop to false
    rerender(<SwitchToggle label="Dark Mode" checked={false} onChange={onChange} />);
    expect(checkbox.checked).toBe(false);
  });

  it("forwards value and name props to the input", () => {
    const { getByRole } = renderWithTheme(
      <SwitchToggle label="T" name="toggleName" value="toggleValue" />
    );
    const checkbox = getByRole("checkbox", { name: "T" });
    expect(checkbox).toHaveAttribute("name", "toggleName");
    expect(checkbox).toHaveAttribute("value", "toggleValue");
  });
});
