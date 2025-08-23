/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import { FormControlAtom } from "./FormControl";
import { FormGroupLabel } from "./FormGroupLabel";
import { FormHelperText } from "./FormHelperText";
import { FormControlLabel } from "./FormControlLabel";
import { TextField, Checkbox } from "@mui/material";

describe("Form Components Integration", () => {
  const setup = () => {
    return render(
      <FormControlAtom>
        <FormGroupLabel>Email Address</FormGroupLabel>
        <TextField
          hiddenLabel
          variant="filled"
          placeholder="Enter your email..."
        />
        <FormHelperText>
          We will never share your email with anyone.
        </FormHelperText>
      </FormControlAtom>
    );
  };

  it("renders all form components together", () => {
    setup();
    
    // Check that all components are rendered
    expect(screen.getByText("Email Address")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter your email...")).toBeTruthy();
    expect(screen.getByText("We will never share your email with anyone.")).toBeTruthy();
  });

  it("renders complete form with error states", () => {
    render(
      <FormControlAtom error>
        <FormGroupLabel error>Email Address</FormGroupLabel>
        <TextField
          error
          hiddenLabel
          variant="filled"
          placeholder="Enter your email..."
        />
        <FormHelperText error>
          Please enter a valid email address.
        </FormHelperText>
      </FormControlAtom>
    );

    // Check error states
    expect(screen.getByText("Email Address")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter your email...")).toBeTruthy();
    expect(screen.getByText("Please enter a valid email address.")).toBeTruthy();
  });

  it("renders form with FormControlLabel", () => {
    render(
      <FormControlAtom>
        <FormGroupLabel>Preferences</FormGroupLabel>
        <FormControlLabel
          control={<Checkbox />}
          label="Subscribe to newsletter"
        />
        <FormHelperText>
          You can unsubscribe at any time.
        </FormHelperText>
      </FormControlAtom>
    );

    // Check FormControlLabel integration
    expect(screen.getByText("Preferences")).toBeTruthy();
    expect(screen.getByText("Subscribe to newsletter")).toBeTruthy();
    expect(screen.getByText("You can unsubscribe at any time.")).toBeTruthy();
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("renders form with different label sizes", () => {
    render(
      <FormControlAtom>
        <FormGroupLabel labelSize="large">Large Label</FormGroupLabel>
        <TextField
          hiddenLabel
          variant="filled"
          placeholder="Enter text..."
        />
        <FormHelperText>
          Helper text for large label.
        </FormHelperText>
      </FormControlAtom>
    );

    expect(screen.getByText("Large Label")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter text...")).toBeTruthy();
    expect(screen.getByText("Helper text for large label.")).toBeTruthy();
  });

  it("renders form with custom styling", () => {
    render(
      <FormControlAtom fullWidth>
        <FormGroupLabel 
          labelSize="large" 
          sx={{ color: "primary.main" }}
        >
          Custom Styled Label
        </FormGroupLabel>
        <TextField
          hiddenLabel
          variant="outlined"
          placeholder="Enter text..."
        />
        <FormHelperText>
          Custom styled form.
        </FormHelperText>
      </FormControlAtom>
    );

    expect(screen.getByText("Custom Styled Label")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter text...")).toBeTruthy();
    expect(screen.getByText("Custom styled form.")).toBeTruthy();
  });

  it("renders complex form layout", () => {
    render(
      <FormControlAtom>
        <FormGroupLabel>Contact Information</FormGroupLabel>
        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            hiddenLabel
            variant="filled"
            placeholder="First Name"
            size="small"
          />
          <TextField
            hiddenLabel
            variant="filled"
            placeholder="Last Name"
            size="small"
          />
        </div>
        <FormHelperText>
          Please provide your full name.
        </FormHelperText>
      </FormControlAtom>
    );

    expect(screen.getByText("Contact Information")).toBeTruthy();
    expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
    expect(screen.getByText("Please provide your full name.")).toBeTruthy();
  });

  it("maintains accessibility in integrated form", () => {
    render(
      <FormControlAtom>
        <FormGroupLabel>Accessible Form</FormGroupLabel>
        <TextField
          hiddenLabel
          variant="filled"
          placeholder="Enter text..."
        />
        <FormHelperText>
          This form is accessible.
        </FormHelperText>
      </FormControlAtom>
    );

    const input = screen.getByPlaceholderText("Enter text...");
    expect(input).toBeTruthy();
    expect(screen.getByText("This form is accessible.")).toBeTruthy();
    // Check that the form has proper structure for accessibility
    expect(screen.getByText("Accessible Form")).toBeTruthy();
  });

  it("handles form with multiple FormControlLabel components", () => {
    render(
      <FormControlAtom>
        <FormGroupLabel>Options</FormGroupLabel>
        <div>
          <FormControlLabel
            control={<Checkbox />}
            label="Option 1"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Option 2"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Option 3"
          />
        </div>
        <FormHelperText>
          Select one or more options.
        </FormHelperText>
      </FormControlAtom>
    );

    expect(screen.getByText("Options")).toBeTruthy();
    expect(screen.getByText("Option 1")).toBeTruthy();
    expect(screen.getByText("Option 2")).toBeTruthy();
    expect(screen.getByText("Option 3")).toBeTruthy();
    expect(screen.getByText("Select one or more options.")).toBeTruthy();
    
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
  });
});
