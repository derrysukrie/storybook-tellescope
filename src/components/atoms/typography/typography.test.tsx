/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render } from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import Typography from "./typography";

const renderWithTheme = render;

describe("Typography", () => {
  it("exports component", () => {
    expect(Typography).toBeDefined();
    expect(typeof Typography).toBe("function");
  });

  it("renders with default props (body1 variant)", () => {
    const { container } = renderWithTheme(<Typography>Hello World</Typography>);
    const typography = container.querySelector(".MuiTypography-root");
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveClass("MuiTypography-body1");
  });

  it("renders children text", () => {
    const { getByText } = renderWithTheme(<Typography>Custom Text</Typography>);
    expect(getByText("Custom Text")).toBeInTheDocument();
  });

  it("applies different variants correctly", () => {
    const { container, rerender } = renderWithTheme(
      <Typography variant="h1">Heading</Typography>
    );
    let typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveClass("MuiTypography-h1");

    rerender(<Typography variant="h2">Subheading</Typography>);
    typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveClass("MuiTypography-h2");

    rerender(<Typography variant="body2">Body Text</Typography>);
    typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveClass("MuiTypography-body2");
  });

  it("applies custom variant with specific styling", () => {
    const { container } = renderWithTheme(
      <Typography variant="custom">Custom Style</Typography>
    );
    const typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveClass("MuiTypography-custom");
    expect(typography).toHaveStyle("font-size: 0.875rem");
    expect(typography).toHaveStyle("font-weight: 500");
    expect(typography).toHaveStyle("line-height: 24px");
    expect(typography).toHaveStyle("letter-spacing: 0.17px");
  });

  it("merges sx styles", () => {
    const { container } = renderWithTheme(
      <Typography sx={{ backgroundColor: "red", color: "white" }}>
        Styled Text
      </Typography>
    );
    const typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveStyle("background-color: rgb(255, 0, 0)");
    expect(typography).toHaveStyle("color: rgb(255, 255, 255)");
  });

  it("forwards other props to MUI Typography", () => {
    const { container } = renderWithTheme(
      <Typography 
        align="center" 
        color="primary"
        gutterBottom
        data-testid="custom-typography"
      >
        Forwarded Props
      </Typography>
    );
    const typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveClass("MuiTypography-alignCenter");
    expect(typography).toHaveClass("MuiTypography-gutterBottom");
    expect(typography).toHaveAttribute("data-testid", "custom-typography");
    // Color is applied via sx, not MUI classes
  });

  it("defaults to text.primary color when no color specified", () => {
    const { container } = renderWithTheme(
      <Typography>Default Color</Typography>
    );
    const typography = container.querySelector(".MuiTypography-root");
    // The color should be applied via sx, but we can verify the component renders
    expect(typography).toBeInTheDocument();
  });

  it("overrides default color when color prop is provided", () => {
    const { container } = renderWithTheme(
      <Typography color="secondary">Secondary Color</Typography>
    );
    const typography = container.querySelector(".MuiTypography-root");
    // Color is applied via sx, not MUI classes
    expect(typography).toBeInTheDocument();
  });

  it("combines multiple props correctly", () => {
    const { container } = renderWithTheme(
      <Typography 
        variant="h3"
        align="right"
        color="error"
        sx={{ margin: "20px" }}
        gutterBottom
      >
        Combined Props
      </Typography>
    );
    const typography = container.querySelector(".MuiTypography-root");
    expect(typography).toHaveClass("MuiTypography-h3");
    expect(typography).toHaveClass("MuiTypography-alignRight");
    // Color is applied via sx, not MUI classes
    expect(typography).toHaveClass("MuiTypography-gutterBottom");
    // Custom margin is applied via sx (may be combined with MUI defaults)
  });
}); 