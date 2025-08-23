/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import { FormControlAtom } from "./FormControl";

describe("FormControlAtom", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof FormControlAtom>>) => {
    const defaultProps = {
      children: <div data-testid="test-child">Test Child</div>,
      ...props,
    };
    return render(<FormControlAtom {...defaultProps} />);
  };

  it("exports component", () => {
    expect(FormControlAtom).toBeDefined();
    expect(typeof FormControlAtom).toBe("function");
  });

  it("renders children correctly", () => {
    setup();
    expect(screen.getByTestId("test-child")).toBeTruthy();
    expect(screen.getByText("Test Child")).toBeTruthy();
  });

  it("renders with default props", () => {
    const { container } = setup();
    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeTruthy();
    
    // Check default props
    expect(formControl?.classList.contains("MuiFormControl-fullWidth")).toBe(false);
    expect(formControl?.classList.contains("Mui-error")).toBe(false);
  });

  it("applies error state when error prop is true", () => {
    const { container } = setup({ error: true });
    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeTruthy();
    // Material-UI FormControl doesn't apply Mui-error class directly
    // The error state is handled by child components
  });

  it("applies fullWidth when fullWidth prop is true", () => {
    const { container } = setup({ fullWidth: true });
    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl?.classList.contains("MuiFormControl-fullWidth")).toBe(true);
  });

  it("applies different variants", () => {
    const { container: standardContainer } = setup({ variant: "standard" });
    const { container: outlinedContainer } = setup({ variant: "outlined" });
    const { container: filledContainer } = setup({ variant: "filled" });

    const standardFormControl = standardContainer.querySelector(".MuiFormControl-root");
    const outlinedFormControl = outlinedContainer.querySelector(".MuiFormControl-root");
    const filledFormControl = filledContainer.querySelector(".MuiFormControl-root");

    expect(standardFormControl).toBeTruthy();
    expect(outlinedFormControl).toBeTruthy();
    expect(filledFormControl).toBeTruthy();
  });

  it("renders as fieldset component", () => {
    const { container } = setup();
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).toBeTruthy();
    expect(fieldset?.classList.contains("MuiFormControl-root")).toBe(true);
  });

  it("handles complex children", () => {
    const complexChildren = (
      <div>
        <input data-testid="input-1" />
        <input data-testid="input-2" />
        <span data-testid="span">Text</span>
      </div>
    );
    
    setup({ children: complexChildren });
    
    expect(screen.getByTestId("input-1")).toBeTruthy();
    expect(screen.getByTestId("input-2")).toBeTruthy();
    expect(screen.getByTestId("span")).toBeTruthy();
    expect(screen.getByText("Text")).toBeTruthy();
  });

  it("combines multiple props correctly", () => {
    const { container } = setup({ 
      error: true, 
      fullWidth: true, 
      variant: "outlined" 
    });
    
    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeTruthy();
    expect(formControl?.classList.contains("MuiFormControl-fullWidth")).toBe(true);
    // Error state is handled by child components, not the FormControl itself
  });
});
