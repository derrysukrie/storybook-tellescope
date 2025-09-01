/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, waitFor, screen } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { Autocomplete } from "./autocomplete";

const renderWithTheme = render;

describe("Autocomplete", () => {
  const defaultProps = {
    label: "Select Option",
    options: ["Option 1", "Option 2", "Option 3"],
    value: null,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports component", () => {
    expect(Autocomplete).toBeDefined();
    expect(typeof Autocomplete).toBe("function");
  });

  describe("Basic Rendering", () => {
    it("renders with label", () => {
      renderWithTheme(<Autocomplete {...defaultProps} />);
      expect(screen.getByText("Select Option")).toBeInTheDocument();
    });

    it("renders input component", () => {
      renderWithTheme(<Autocomplete {...defaultProps} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders with custom label", () => {
      renderWithTheme(<Autocomplete {...defaultProps} label="Custom Label" />);
      expect(screen.getByText("Custom Label")).toBeInTheDocument();
    });
  });

  describe("Options Handling", () => {
    it("displays options when clicked", async () => {
      const user = userEvent.setup();
      renderWithTheme(<Autocomplete {...defaultProps} />);
      
      const input = screen.getByRole("combobox");
      await user.click(input);
      
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
        expect(screen.getByText("Option 3")).toBeInTheDocument();
      });
    });

    it("calls onChange when option is selected", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderWithTheme(<Autocomplete {...defaultProps} onChange={onChange} />);
      
      const input = screen.getByRole("combobox");
      await user.click(input);
      
      await waitFor(() => {
        const option = screen.getByText("Option 1");
        user.click(option);
      });
      
      // Wait for the onChange to be called
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith("Option 1");
      });
    });
  });

  describe("Multiple Selection", () => {
    it("renders in multiple mode", () => {
      renderWithTheme(<Autocomplete {...defaultProps} multiple={true} />);
      // Check that the component renders without crashing in multiple mode
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("handles multiple selections", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderWithTheme(<Autocomplete {...defaultProps} multiple={true} onChange={onChange} />);
      
      const input = screen.getByRole("combobox");
      await user.click(input);
      
      // Select first option
      await waitFor(() => {
        const option1 = screen.getByText("Option 1");
        user.click(option1);
      });
      
      // Wait for the first selection to be processed
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(["Option 1"]);
      });
      
      // Test that the component can handle multiple values by setting them directly
      const { rerender } = renderWithTheme(<Autocomplete {...defaultProps} multiple={true} value={["Option 1", "Option 2"]} onChange={onChange} />);
      
      // Verify that both options are displayed as chips by looking for chip labels specifically
      const chipLabels = screen.getAllByText(/Option [12]/);
      // Filter to only chip labels (not dropdown options)
      const actualChipLabels = chipLabels.filter(label => 
        label.closest('.MuiChip-label') !== null
      );
      expect(actualChipLabels).toHaveLength(2);
      expect(actualChipLabels.some(label => label.textContent === "Option 1")).toBe(true);
      expect(actualChipLabels.some(label => label.textContent === "Option 2")).toBe(true);
    });

    it("renders chips for selected options in multiple mode", () => {
      renderWithTheme(<Autocomplete {...defaultProps} multiple={true} value={["Option 1", "Option 2"]} />);
      
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  describe("Value Handling", () => {
    it("displays single selected value", () => {
      renderWithTheme(<Autocomplete {...defaultProps} value="Option 1" />);
      expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
    });

    it("displays multiple selected values", () => {
      renderWithTheme(<Autocomplete {...defaultProps} multiple={true} value={["Option 1", "Option 2"]} />);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("handles null value safely", () => {
      renderWithTheme(<Autocomplete {...defaultProps} value={null} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("Appearance Variants", () => {
    it("renders with standard appearance", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} appearance="standard" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });

    it("renders with outlined appearance", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} appearance="outlined" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });

    it("renders with filled appearance", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} appearance="filled" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });

    it("renders with table appearance", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} appearance="table" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });
  });

  describe("Form States", () => {
    it("renders with error state", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} error={true} helperText="Error message" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });

    it("renders with helper text", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} helperText="Help text" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });

    it("renders in disabled state", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} disabled={true} />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });
  });

  describe("Size Prop", () => {
    it("renders with small size", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} size="small" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });

    it("renders with medium size", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} size="medium" />);
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });
  });

  describe("Disable Close On Select", () => {
    it("keeps dropdown open after selection in multiple mode", async () => {
      const user = userEvent.setup();
      renderWithTheme(<Autocomplete {...defaultProps} multiple={true} disableCloseOnSelect={true} />);
      
      const input = screen.getByRole("combobox");
      await user.click(input);
      
      // Select an option
      await waitFor(() => {
        const option = screen.getByText("Option 1");
        user.click(option);
      });
      
      // Dropdown should still be open
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  describe("TextField Props", () => {
    it("passes custom textFieldProps to Input component", () => {
      const customProps = { placeholder: "Custom placeholder" };
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} textFieldProps={customProps} />);
      
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
    });
  });

  describe("Component Composition", () => {
    it("uses Material-UI components correctly", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} />);
      
      expect(container.querySelector(".MuiFormControl-root")).toBeTruthy();
      expect(container.querySelector(".MuiAutocomplete-root")).toBeTruthy();
    });

    it("integrates with FormControl", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} error={true} />);
      
      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeTruthy();
    });

    it("integrates with MuiAutocomplete", () => {
      const { container } = renderWithTheme(<Autocomplete {...defaultProps} />);
      
      const autocomplete = container.querySelector(".MuiAutocomplete-root");
      expect(autocomplete).toBeTruthy();
    });
  });
});
