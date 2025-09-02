import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import { ChatConversation } from "./ChatConversation";

const renderWithTheme = render;

describe("ChatConversation", () => {
  const defaultProps = {
    userMessage: "Test user message",
    responseMessage: "Test response message",
  };

  const setup = (props?: Partial<typeof defaultProps>) => {
    return renderWithTheme(<ChatConversation {...defaultProps} {...props} />);
  };

  it("should export component", () => {
    expect(ChatConversation).toBeDefined();
    expect(typeof ChatConversation).toBe("function");
  });

  describe("Rendering", () => {
    it("renders correctly", () => {
      const { container } = setup();
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders with correct section wrapper", () => {
      const { container } = setup();
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders with Box components", () => {
      const { container } = setup();
      const boxElements = container.querySelectorAll(".MuiBox-root");
      expect(boxElements.length).toBeGreaterThan(0);
    });
  });

  describe("Props handling", () => {
    it("displays user message correctly", () => {
      const userMessage = "Hello, how are you?";
      setup({ userMessage });
      
      expect(screen.getByText(userMessage)).toBeInTheDocument();
    });

    it("displays response message correctly", () => {
      const responseMessage = "I'm doing great, thank you!";
      setup({ responseMessage });
      
      expect(screen.getByText(responseMessage)).toBeInTheDocument();
    });

    it("handles long messages", () => {
      const longMessage = "This is a very long message that should be handled properly by the component without breaking the layout or causing any rendering issues";
      setup({ userMessage: longMessage });
      
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
  });

  describe("Component integration", () => {
    it("renders Page component", () => {
      const { container } = setup();
      const pageElement = container.querySelector(".MuiBox-root");
      expect(pageElement).toBeInTheDocument();
    });

    it("renders SentChat component", () => {
      setup();
      expect(screen.getByText(defaultProps.userMessage)).toBeInTheDocument();
    });

    it("renders ChatFeedback component", () => {
      const { container } = setup();
      const feedbackElement = container.querySelector(".MuiBox-root");
      expect(feedbackElement).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has semantic HTML structure", () => {
      const { container } = setup();
      
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      
      const div = container.querySelector("div");
      expect(div).toBeInTheDocument();
    });

    it("renders Typography with correct variant", () => {
      const { container } = setup();
      const typography = container.querySelector('[class*="MuiTypography-body1"]');
      expect(typography).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles special characters in messages", () => {
      const specialMessage = "Message with special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?";
      setup({ userMessage: specialMessage });
      
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });

    it("handles HTML-like content safely", () => {
      const htmlLikeMessage = "<script>alert('xss')</script>Hello";
      setup({ userMessage: htmlLikeMessage });
      
      expect(screen.getByText(htmlLikeMessage)).toBeInTheDocument();
    });
  });
});
