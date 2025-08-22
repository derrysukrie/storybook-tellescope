/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import CheckBox from "./checkbox";

const renderWithTheme = render;

describe("CheckBox", () => {
  it("exports component", () => {
    expect(CheckBox).toBeDefined();
    expect(typeof CheckBox).toBe("function");
  });

  it("renders a checkbox and supports accessible name via inputProps aria-label", () => {
    const { getByRole } = renderWithTheme(
      <CheckBox inputProps={{ "aria-label": "Accept terms" }} />
    );
    expect(getByRole("checkbox", { name: "Accept terms" })).toBeTruthy();
  });

  it("is checkable via user interaction", async () => {
    const user = userEvent.setup();
    const { getByRole } = renderWithTheme(
      <CheckBox inputProps={{ "aria-label": "Opt in" }} />
    );
    const checkbox = getByRole("checkbox", { name: "Opt in" }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("disables ripple on the underlying MUI component", () => {
    const { container } = renderWithTheme(<CheckBox aria-label="No ripple" />);
    // MUI adds ripple element when enabled; ensure it's not present
    expect(container.querySelector(".MuiTouchRipple-root")).toBeNull();
  });

  it("maps color prop to MUI color classes", () => {
    const { container, rerender } = renderWithTheme(<CheckBox />);
    // default color is primary
    expect(container.querySelector(".MuiCheckbox-colorPrimary")).not.toBeNull();

    rerender(<CheckBox color="secondary" />);
    expect(container.querySelector(".MuiCheckbox-colorSecondary")).not.toBeNull();

    rerender(<CheckBox color="info" />);
    expect(container.querySelector(".MuiCheckbox-colorInfo")).not.toBeNull();
  });

  it("maps size prop to MUI size classes", () => {
    const { container, rerender } = renderWithTheme(<CheckBox size="small" />);
    expect(container.querySelector(".MuiCheckbox-sizeSmall")).not.toBeNull();

    rerender(<CheckBox size="medium" />);
    expect(container.querySelector(".MuiCheckbox-sizeMedium")).not.toBeNull();

    rerender(<CheckBox size="large" />);
    expect(container.querySelector(".MuiCheckbox-sizeLarge")).not.toBeNull();
  });

  it("forwards arbitrary props (data-testid)", () => {
    const { getByTestId } = renderWithTheme(<CheckBox data-testid="cb" />);
    expect(getByTestId("cb")).toBeTruthy();
  });
});


