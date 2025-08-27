/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof Drawer>>) => {
    const utils = render(<Drawer {...props} />);
    return utils;
  };

  it("exports component", () => {
    expect(Drawer).toBeDefined();
    expect(typeof Drawer).toBe("function");
  });

  describe("State Management", () => {
    it("initializes with closed state by default", () => {
      setup();
      expect(screen.getByRole("button", { name: "Open Drawer" })).toBeTruthy();
    });

    it("initializes with closed state when open is false", () => {
      setup({ open: false });
      expect(screen.getByRole("button", { name: "Open Drawer" })).toBeTruthy();
    });

    it("toggles internal state on button click", async () => {
      const user = userEvent.setup();
      setup();
      
      // Initially closed
      expect(screen.getByRole("button", { name: "Open Drawer" })).toBeTruthy();
      
      // Click to open
      const openButton = screen.getByRole("button", { name: "Open Drawer" });
      await user.click(openButton);
      
      // After clicking, the button should change text
      // Use querySelector to find the button even if it's hidden
      const button = document.querySelector("button");
      expect(button?.textContent?.trim()).toContain("Close");
      expect(button?.textContent?.trim()).toContain("Drawer");
    });

    it("maintains consistent state through rapid clicks", async () => {
      const user = userEvent.setup();
      setup();
      
      const button = screen.getByRole("button");
      
      // Rapid clicks
      await user.click(button); // Open
      await user.click(button); // Close
      await user.click(button); // Open
      
      // Should end up in open state
      expect(button.textContent?.trim()).toContain("Close");
      expect(button.textContent?.trim()).toContain("Drawer");
    });
  });

  describe("Temporary Drawer Mode (Default)", () => {
    it("shows open/close button text correctly in temporary mode", async () => {
      const user = userEvent.setup();
      setup();
      
      // Initially shows "Open Drawer"
      const button = screen.getByRole("button", { name: "Open Drawer" });
      expect(button).toBeTruthy();
      
      // After clicking, shows "Close Drawer"
      await user.click(button);
      const updatedButton = document.querySelector("button");
      expect(updatedButton?.textContent?.trim()).toContain("Close");
      expect(updatedButton?.textContent?.trim()).toContain("Drawer");
    });

    it("handles opening and closing multiple times in temporary mode", async () => {
      const user = userEvent.setup();
      setup();
      
      const button = screen.getByRole("button");
      
      // Open
      await user.click(button);
      expect(button.textContent?.trim()).toContain("Close");
      expect(button.textContent?.trim()).toContain("Drawer");
      
      // Close
      await user.click(button);
      expect(button.textContent?.trim()).toContain("Open");
      expect(button.textContent?.trim()).toContain("Drawer");
      
      // Open again
      await user.click(button);
      expect(button.textContent?.trim()).toContain("Close");
      expect(button.textContent?.trim()).toContain("Drawer");
    });
  });

  describe("Persistent Drawer Mode", () => {
    it("renders main content in persistent mode", () => {
      setup({ 
        persistent: true, 
        open: true,
        mainContent: <div data-testid="persistent-main">Persistent Main Content</div> 
      });
      expect(screen.getByTestId("persistent-main")).toBeTruthy();
      expect(screen.getByText("Persistent Main Content")).toBeTruthy();
    });

    it("applies different layout in persistent mode", () => {
      const { container } = setup({ persistent: true, open: true });
      
      // Should have main element for content layout
      const main = container.querySelector("main");
      expect(main).toBeTruthy();
      
      // Should have both drawer and main content
      const drawer = container.querySelector(".MuiDrawer-root");
      expect(drawer).toBeTruthy();
    });

    it("handles state transitions correctly in persistent mode", async () => {
      const user = userEvent.setup();
      setup({ persistent: true, open: false });
      
      // Start closed
      expect(screen.getByRole("button", { name: "Open Drawer" })).toBeTruthy();
      
      // Open drawer
      await user.click(screen.getByRole("button", { name: "Open Drawer" }));
      const button = screen.getByRole("button");
      expect(button.textContent?.trim()).toContain("Close");
      expect(button.textContent?.trim()).toContain("Drawer");
    });
  });

  describe("Mode Comparison", () => {
    it("renders different DOM structure for temporary vs persistent", () => {
      // Temporary mode
      const { container: tempContainer } = setup({ open: true, persistent: false });
      const tempMain = tempContainer.querySelector("main");
      expect(tempMain).toBeNull();
      
      // Persistent mode
      const { container: persContainer } = setup({ open: true, persistent: true });
      const persMain = persContainer.querySelector("main");
      expect(persMain).toBeTruthy();
    });

    it("both modes support title and children props", () => {
      // Temporary mode with content
      const { rerender } = setup({ 
        open: true, 
        persistent: false,
        title: "Temp Title",
        children: <div data-testid="temp-content">Temp Content</div>
      });
      
      expect(screen.getByText("Temp Title")).toBeTruthy();
      expect(screen.getByTestId("temp-content")).toBeTruthy();
      
      // Persistent mode with content
      rerender(
        <Drawer 
          open={true} 
          persistent={true}
          title="Pers Title"
          children={<div data-testid="pers-content">Pers Content</div>}
        />
      );
      
      expect(screen.getByText("Pers Title")).toBeTruthy();
      expect(screen.getByTestId("pers-content")).toBeTruthy();
    });
  });

  describe("Content Rendering", () => {
    it("renders title when provided", () => {
      setup({ open: true, title: "Test Drawer Title" });
      expect(screen.getByText("Test Drawer Title")).toBeTruthy();
    });

    it("renders children content when provided", () => {
      setup({ 
        open: true, 
        children: <div data-testid="drawer-content">Drawer Content</div> 
      });
      expect(screen.getByTestId("drawer-content")).toBeTruthy();
      expect(screen.getByText("Drawer Content")).toBeTruthy();
    });

    it("renders complex children content", () => {
      setup({ 
        open: true, 
        children: (
          <div>
            <h2>Section Title</h2>
            <p>Description text</p>
            <button>Action Button</button>
          </div>
        ) 
      });
      
      expect(screen.getByText("Section Title")).toBeTruthy();
      expect(screen.getByText("Description text")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Action Button" })).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined props gracefully", () => {
      const { container } = setup({
        open: undefined,
        title: undefined,
        children: undefined,
        persistent: undefined,
        hugContents: undefined,
        mainContent: undefined
      });
      
      expect(container).toBeTruthy();
      expect(screen.getByRole("button", { name: "Open Drawer" })).toBeTruthy();
    });
  });
});
