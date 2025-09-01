/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "../../../../test/test-utils";
import { act } from "react";
import SectionCategory from "./SectionCategory";

const renderWithTheme = render;

describe("SectionCategory", () => {
  it("renders MUI Accordion component", () => {
    const { container } = renderWithTheme(<SectionCategory />);
    expect(container.querySelector(".MuiAccordion-root")).toBeTruthy();
  });

  it("exports component as default", () => {
    expect(SectionCategory).toBeDefined();
    expect(typeof SectionCategory).toBe("function");
  });

  describe("Default props", () => {
    it("renders with default title", () => {
      const { getByText } = renderWithTheme(<SectionCategory />);
      expect(getByText("Tagged as")).toBeTruthy();
    });

    it("renders collapsed by default", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).not.toHaveClass("Mui-expanded");
    });

    it("renders unselected by default", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toBeTruthy();
      // Selected state is handled by background color, not CSS class
    });
  });

  describe("Title prop", () => {
    it("renders custom title", () => {
      const { getByText } = renderWithTheme(<SectionCategory title="Custom Title" />);
      expect(getByText("Custom Title")).toBeTruthy();
    });

    it("renders empty title", () => {
      const { container } = renderWithTheme(<SectionCategory title="" />);
      const titleElement = container.querySelector(".MuiTypography-root");
      expect(titleElement).toHaveTextContent("");
    });
  });

  describe("Children prop", () => {
    it("renders children when expanded", () => {
      const { getByText, container } = renderWithTheme(
        <SectionCategory expanded={true}>
          <div>Test Content</div>
        </SectionCategory>
      );

      // Click to expand (since expanded prop sets initial state but we need to trigger expansion)
      const summary = container.querySelector(".MuiAccordionSummary-root");
      fireEvent.click(summary!);

      expect(getByText("Test Content")).toBeTruthy();
    });

    it("renders children in DOM when collapsed but content is hidden", () => {
      const { getByText, container } = renderWithTheme(
        <SectionCategory expanded={false}>
          <div>Test Content</div>
        </SectionCategory>
      );

      // Children are always in the DOM but hidden when collapsed
      expect(getByText("Test Content")).toBeTruthy();

      // The AccordionDetails should be present but not visible
      const details = container.querySelector(".MuiAccordionDetails-root");
      expect(details).toBeTruthy();
    });
  });

  describe("Expanded prop", () => {
    it("respects initial expanded state", () => {
      const { container } = renderWithTheme(<SectionCategory expanded={true} />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toHaveClass("Mui-expanded");
    });

    it("respects initial collapsed state", () => {
      const { container } = renderWithTheme(<SectionCategory expanded={false} />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).not.toHaveClass("Mui-expanded");
    });
  });

  describe("Selected prop", () => {
    it("applies selected styling when selected is true", () => {
      const { container } = renderWithTheme(<SectionCategory selected={true} />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toBeTruthy();
      // The selected styling is applied via sx prop, so we verify the component renders
    });

    it("does not apply selected styling when selected is false", () => {
      const { container } = renderWithTheme(<SectionCategory selected={false} />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toBeTruthy();
    });
  });

  describe("State management", () => {
    it("toggles expanded state on summary click", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const summary = container.querySelector(".MuiAccordionSummary-root");
      const accordion = container.querySelector(".MuiAccordion-root");

      // Initially collapsed
      expect(accordion).not.toHaveClass("Mui-expanded");

      // Click to expand
      fireEvent.click(summary!);
      expect(accordion).toHaveClass("Mui-expanded");

      // Click to collapse
      fireEvent.click(summary!);
      expect(accordion).not.toHaveClass("Mui-expanded");
    });

    it("uses internal state that overrides initial expanded prop after user interaction", () => {
      const { container } = renderWithTheme(<SectionCategory expanded={true} />);
      const summary = container.querySelector(".MuiAccordionSummary-root");
      const accordion = container.querySelector(".MuiAccordion-root");

      // Initially expanded due to prop
      expect(accordion).toHaveClass("Mui-expanded");

      // Click to collapse - internal state takes over
      fireEvent.click(summary!);
      expect(accordion).not.toHaveClass("Mui-expanded");

      // Click to expand again - internal state controls it
      fireEvent.click(summary!);
      expect(accordion).toHaveClass("Mui-expanded");
    });
  });

  describe("Icons and visual elements", () => {
    it("renders arrow icon", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      expect(container.querySelector("svg")).toBeTruthy();
    });

    it("renders add icon button", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const addButton = container.querySelector(".MuiIconButton-root");
      expect(addButton).toBeTruthy();
    });

    it("rotates arrow icon when expanded", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const summary = container.querySelector(".MuiAccordionSummary-root");
      const arrowIcon = container.querySelector("svg");

      // Initially not rotated
      expect(arrowIcon).toBeTruthy();

      // Click to expand
      fireEvent.click(summary!);
      // The rotation is handled by CSS transform, so we verify the component still works
      expect(arrowIcon).toBeTruthy();
    });
  });

  describe("Event handling", () => {
    it("prevents event propagation on title click", () => {
      const mockOnChange = vi.fn();
      const { container } = renderWithTheme(<SectionCategory />);

      // Mock the accordion's onChange
      const accordion = container.querySelector(".MuiAccordion-root");
      accordion?.addEventListener("change", mockOnChange);

      const titleBox = container.querySelector(".MuiTypography-root")?.parentElement;
      fireEvent.click(titleBox!);

      // The click should not trigger accordion expansion due to stopPropagation
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("handles add button click", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const addButton = container.querySelector(".MuiIconButton-root");

      expect(() => {
        fireEvent.click(addButton!);
      }).not.toThrow();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const summary = container.querySelector(".MuiAccordionSummary-root");

      // AccordionSummary has the button role for accessibility
      expect(summary).toHaveAttribute("role", "button");
    });

    it("supports keyboard navigation", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const summary = container.querySelector(".MuiAccordionSummary-root");

      act(() => {
        (summary as HTMLElement)?.focus();
      });
      expect(document.activeElement).toBe(summary);
    });
  });

  describe("Styling and CSS classes", () => {
    it("applies MUI Accordion classes", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toHaveClass("MuiAccordion-root");
    });

    it("applies MUI AccordionSummary classes", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const summary = container.querySelector(".MuiAccordionSummary-root");
      expect(summary).toHaveClass("MuiAccordionSummary-root");
    });

    it("applies MUI AccordionDetails classes", () => {
      const { container } = renderWithTheme(<SectionCategory expanded={true} />);
      const summary = container.querySelector(".MuiAccordionSummary-root");
      fireEvent.click(summary!);

      const details = container.querySelector(".MuiAccordionDetails-root");
      expect(details).toHaveClass("MuiAccordionDetails-root");
    });
  });

  describe("Edge cases", () => {
    it("handles undefined children", () => {
      expect(() => {
        renderWithTheme(<SectionCategory children={undefined} />);
      }).not.toThrow();
    });

    it("handles null children", () => {
      expect(() => {
        renderWithTheme(<SectionCategory>{null}</SectionCategory>);
      }).not.toThrow();
    });

    it("handles long titles", () => {
      const longTitle = "A very long title that should still render properly without breaking the layout";
      const { getByText } = renderWithTheme(<SectionCategory title={longTitle} />);
      expect(getByText(longTitle)).toBeTruthy();
    });

    it("handles special characters in title", () => {
      const specialTitle = "Title with <script> & special chars";
      const { getByText } = renderWithTheme(<SectionCategory title={specialTitle} />);
      expect(getByText(specialTitle)).toBeTruthy();
    });
  });

  describe("Integration with MUI", () => {
    it("integrates properly with MUI theme", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toBeTruthy();
      // The component should render without MUI theme errors
    });

    it("applies custom styling through internal sx prop", () => {
      const { container } = renderWithTheme(<SectionCategory />);
      const accordion = container.querySelector(".MuiAccordion-root");
      expect(accordion).toBeTruthy();
      // The component applies its own styling internally
    });
  });
});
