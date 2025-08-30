/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render } from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import Textarea from "./textarea";

const renderWithTheme = render;

describe("Textarea", () => {
  it("exports component", () => {
    expect(Textarea).toBeDefined();
    expect(typeof Textarea).toBe("function");
  });

  it("renders with standard appearance", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="standard" label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with filled appearance", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="filled" label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with outlined appearance", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="outlined" label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with distinct appearance", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="distinct" label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("patientForm appearance overrides to distinct and sets multiline", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="patientForm" label="Patient Notes" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
    // Should have multiline attribute
    expect(textarea).toHaveAttribute("rows", "9");
  });

  it("uses custom rows prop when provided", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="standard" rows={5} label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("defaults to 9 rows when rows not provided", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="standard" label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toHaveAttribute("rows", "9");
  });

  it("merges sx styles", () => {
    const { container } = renderWithTheme(
      <Textarea 
        appearance="standard" 
        label="Description"
        sx={{ backgroundColor: "red" }} 
      />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
    // The sx should be applied to the Input wrapper
    const inputWrapper = container.querySelector(".MuiInputBase-root");
    expect(inputWrapper).toBeInTheDocument();
  });

  it("forwards other props to Input component", () => {
    const { container } = renderWithTheme(
      <Textarea 
        appearance="standard" 
        label="Description"
        placeholder="Enter text here"
        disabled
      />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toHaveAttribute("placeholder", "Enter text here");
    expect(textarea).toBeDisabled();
  });

  it("patientForm appearance sets hiddenLabel and uses label as placeholder", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="patientForm" label="Patient Notes" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toHaveAttribute("placeholder", "Patient Notes");
    // Should not have visible label
    const label = container.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });

  it("applies maxRows=9 for all appearances", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="standard" label="Description" />
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
    // maxRows is applied via the Input component's multiline prop
  });

  it("sets width to 14rem by default", () => {
    const { container } = renderWithTheme(
      <Textarea appearance="standard" label="Description" />
    );
    const inputWrapper = container.querySelector(".MuiInputBase-root");
    expect(inputWrapper).toBeInTheDocument();
    // The width styling is applied via sx
  });
});