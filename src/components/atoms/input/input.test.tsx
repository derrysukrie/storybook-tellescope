/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "../../../../test/test-utils";
import { Input } from "./input";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

describe("Input", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof Input>>) => {
    const defaultProps = {
      label: "Test Label",
      ...props,
    };
    return render(<Input {...defaultProps} />);
  };

  it("should export component", () => {
    expect(Input).toBeDefined();
    expect(typeof Input).toBe("function");
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      const { container } = setup();
      expect(container).toBeTruthy();
    });

    it("renders with default props", () => {
      const { container } = setup();
      
      const input = container.querySelector("input");
      expect(input).toBeTruthy();
      expect(input?.getAttribute("type")).toBe("text");
    });

    it("renders with custom label", () => {
      const { container } = setup({ label: "Custom Label" });
      
      const label = container.querySelector("label");
      expect(label?.textContent).toContain("Custom Label");
    });

    it("renders with placeholder", () => {
      const { container } = setup({ placeholder: "Custom Placeholder" });
      
      const input = container.querySelector("input");
      expect(input?.getAttribute("placeholder")).toBe("Custom Placeholder");
    });
  });

  describe("Controlled vs Uncontrolled Behavior", () => {
    it("works in controlled mode with value and onChange", () => {
      const onChange = vi.fn();
      const { container } = setup({ 
        value: "controlled value", 
        onChange 
      });
      
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("controlled value");
      
      fireEvent.change(input, { target: { value: "new value" } });
      expect(onChange).toHaveBeenCalled();
    });

    it("works in uncontrolled mode with defaultValue", () => {
      const { container } = setup({ defaultValue: "default value" });
      
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("default value");
    });

    it("updates internal state in uncontrolled mode", () => {
      const { container } = setup({ defaultValue: "initial" });
      
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "updated" } });
      
      expect(input.value).toBe("updated");
    });

    it("prioritizes controlled value over defaultValue", () => {
      const { container } = setup({ 
        value: "controlled", 
        defaultValue: "default" 
      });
      
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("controlled");
    });
  });

  describe("Change Handling", () => {
    it("calls onChange in controlled mode", () => {
      const onChange = vi.fn();
      const { container } = setup({ 
        value: "test", 
        onChange 
      });
      
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "new value" } });
      
      expect(onChange).toHaveBeenCalledTimes(1);
      // The onChange receives a React synthetic event, so we check it was called
      expect(onChange).toHaveBeenCalled();
    });

    it("updates internal state in uncontrolled mode", () => {
      const { container } = setup({ defaultValue: "initial" });
      
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "new value" } });
      
      expect(input.value).toBe("new value");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards basic props to MUI TextField", () => {
      const { container } = setup({ 
        label: "Test Label",
        placeholder: "Test Placeholder",
        helperText: "Helper text"
      });
      
      const input = container.querySelector("input");
      expect(input?.getAttribute("placeholder")).toBe("Test Placeholder");
      
      const helperText = container.querySelector(".MuiFormHelperText-root");
      expect(helperText?.textContent).toContain("Helper text");
    });

    it("forwards size prop", () => {
      const { container } = setup({ size: "small" });
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
    });

    it("forwards error prop", () => {
      const { container } = setup({ error: true, helperText: "Error message" });
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
      
      const helperText = container.querySelector(".MuiFormHelperText-root");
      expect(helperText?.textContent).toContain("Error message");
    });

  });

  describe("Appearance Variants", () => {
    it("renders standard appearance by default", () => {
      const { container } = setup();
      
      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toBeTruthy();
    });

    it("renders filled appearance", () => {
      const { container } = setup({ appearance: "filled" });
      
      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toBeTruthy();
    });

    it("renders outlined appearance", () => {
      const { container } = setup({ appearance: "outlined" });
      
      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toBeTruthy();
    });

    it("renders distinct appearance", () => {
      const { container } = setup({ appearance: "distinct" });
      
      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toBeTruthy();
    });
  });

  describe("Size Variants", () => {
    it("renders medium size by default", () => {
      const { container } = setup();
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
    });

    it("renders small size", () => {
      const { container } = setup({ size: "small" });
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
    });
  });

  describe("Error States", () => {
    it("applies error styling when error prop is true", () => {
      const { container } = setup({ error: true });
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
    });

    it("displays helper text when provided", () => {
      const { container } = setup({ helperText: "Error message" });
      
      const helperText = container.querySelector(".MuiFormHelperText-root");
      expect(helperText?.textContent).toContain("Error message");
    });

    it("combines error state with helper text", () => {
      const { container } = setup({ 
        error: true, 
        helperText: "Error message" 
      });
      
      const helperText = container.querySelector(".MuiFormHelperText-root");
      expect(helperText?.textContent).toContain("Error message");
    });
  });

  describe("Icon Adornments", () => {
    it("renders start icon when provided", () => {
      const { container } = setup({ startIcon: <SearchIcon /> });
      
      const startAdornment = container.querySelector(".MuiInputAdornment-positionStart");
      expect(startAdornment).toBeTruthy();
    });

    it("renders end icon when provided", () => {
      const { container } = setup({ endIcon: <ClearIcon /> });
      
      const endAdornment = container.querySelector(".MuiInputAdornment-positionEnd");
      expect(endAdornment).toBeTruthy();
    });

    it("renders both start and end icons", () => {
      const { container } = setup({ 
        startIcon: <SearchIcon />, 
        endIcon: <ClearIcon /> 
      });
      
      const startAdornment = container.querySelector(".MuiInputAdornment-positionStart");
      const endAdornment = container.querySelector(".MuiInputAdornment-positionEnd");
      
      expect(startAdornment).toBeTruthy();
      expect(endAdornment).toBeTruthy();
    });

    it("handles missing icons gracefully", () => {
      const { container } = setup();
      
      const startAdornment = container.querySelector(".MuiInputAdornment-positionStart");
      const endAdornment = container.querySelector(".MuiInputAdornment-positionEnd");
      
      expect(startAdornment).toBeFalsy();
      expect(endAdornment).toBeFalsy();
    });
  });

  describe("Label Behavior", () => {
    it("displays label when provided", () => {
      const { container } = setup({ label: "Test Label" });
      
      const label = container.querySelector("label");
      expect(label?.textContent).toContain("Test Label");
    });

    it("uses placeholder when no placeholder provided (distinct appearance only)", () => {
      const { container } = setup({ 
        label: "Test Label", 
        placeholder: undefined,
        appearance: "distinct"
      });
      
      const input = container.querySelector("input");
      // Distinct appearance has placeholder fallback logic
      expect(input?.getAttribute("placeholder")).toBe("Test Label");
    });

    it("does not use label as placeholder fallback for non-distinct appearances", () => {
      const { container } = setup({ 
        label: "Test Label", 
        placeholder: undefined,
        appearance: "outlined"
      });
      
      const input = container.querySelector("input");
      // Non-distinct appearances don't have placeholder fallback
      expect(input?.getAttribute("placeholder")).toBe(null);
    });

    it("prioritizes placeholder over label fallback", () => {
      const { container } = setup({ 
        label: "Test Label", 
        placeholder: "Custom Placeholder" 
      });
      
      const input = container.querySelector("input");
      expect(input?.getAttribute("placeholder")).toBe("Custom Placeholder");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined onChange in controlled mode", () => {
      const { container } = setup({ value: "test" });
      
      const input = container.querySelector("input") as HTMLInputElement;
      // Should not crash when onChange is undefined
      fireEvent.change(input, { target: { value: "new value" } });
      
      expect(input).toBeTruthy();
    });

    it("handles empty string values", () => {
      const { container } = setup({ value: "" });
      
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("");
    });

    it("handles null/undefined values gracefully", () => {
      const { container } = setup({ value: undefined });
      
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("");
    });

    it("handles very long values", () => {
      const longValue = "a".repeat(1000);
      const { container } = setup({ value: longValue });
      
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe(longValue);
    });
  });

  describe("Component Composition", () => {
    it("uses Material-UI components correctly", () => {
      const { container } = setup();
      
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
      expect(container.querySelector(".MuiTextField-root")).toBeTruthy();
    });

    it("integrates with FormControl", () => {
      const { container } = setup({ error: true });
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
    });

    it("integrates with TextField", () => {
      const { container } = setup();
      
      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toBeTruthy();
    });
  });
});
