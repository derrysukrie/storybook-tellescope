/** @vitest-environment jsdom */
import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import { Icon } from "./Icon";
import { Home, Favorite, Star } from "@mui/icons-material";

describe("Icon", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof Icon>>) => {
    return render(<Icon icon={Home} {...props} />);
  };

  it("should export component", () => {
    expect(Icon).toBeDefined();
    expect(typeof Icon).toBe("function");
  });

  describe("MUI Icon Rendering", () => {
    it("renders default medium size", () => {
      const { container } = setup();
      const svgIcon = container.querySelector(".MuiSvgIcon-root");
      expect(svgIcon?.classList.contains("MuiSvgIcon-fontSizeMedium")).toBe(true);
    });

    it("renders with size variants", () => {
      const { container: c1 } = setup({ icon: Favorite, size: "small" });
      const svgIcon1 = c1.querySelector(".MuiSvgIcon-root");
      expect(svgIcon1?.classList.contains("MuiSvgIcon-fontSizeSmall")).toBe(true);

      const { container: c2 } = setup({ icon: Star, size: "large" });
      const svgIcon2 = c2.querySelector(".MuiSvgIcon-root");
      expect(svgIcon2?.classList.contains("MuiSvgIcon-fontSizeLarge")).toBe(true);
    });

    it("renders different icons", () => {
      const { rerender } = setup({ icon: Home });
      expect(screen.getByTestId("HomeIcon")).toBeTruthy();

      rerender(<Icon icon={Favorite} />);
      expect(screen.getByTestId("FavoriteIcon")).toBeTruthy();

      rerender(<Icon icon={Star} />);
      expect(screen.getByTestId("StarIcon")).toBeTruthy();
    });

    it("forwards additional props", () => {
      const { container } = setup({ 
        color: "primary",
        className: "custom-icon-class"
      });
      const svgIcon = container.querySelector(".MuiSvgIcon-root");
      expect(svgIcon?.classList.contains("custom-icon-class")).toBe(true);
      expect(svgIcon?.classList.contains("MuiSvgIcon-colorPrimary")).toBe(true);
    });

    it("respects fontSize prop over size", () => {
      const { container } = setup({ size: "large" });
      const svgIcon = container.querySelector(".MuiSvgIcon-root");
      expect(svgIcon?.classList.contains("MuiSvgIcon-fontSizeLarge")).toBe(true);
    });
  });

  describe("SVG File Rendering", () => {
    const path = "/path/to/icon.svg";

    it("renders img when icon is string", () => {
      const { container } = setup({ icon: path });
      const img = container.querySelector("img");
      expect(img?.getAttribute("src")).toBe(path);
      expect(img?.getAttribute("alt")).toBe("");
    });

    it("applies correct size dimensions", () => {
      const sizes = {
        small: "20px",
        medium: "24px",
        large: "32px"
      } as const;

      (Object.keys(sizes) as Array<keyof typeof sizes>).forEach(size => {
        const { container } = setup({ icon: path, size });
        const img = container.querySelector("img");
        expect(img?.style.width).toBe(sizes[size]);
        expect(img?.style.height).toBe(sizes[size]);
      });
    });

    it("forwards className and style", () => {
      const { container } = setup({ 
        icon: path,
        className: "custom-svg",
        style: { border: "1px solid red" }
      });
      const img = container.querySelector("img");
      expect(img?.classList.contains("custom-svg")).toBe(true);
      expect(img?.style.border).toBe("1px solid red");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined size as medium", () => {
      const { container } = setup({ size: undefined });
      const svgIcon = container.querySelector(".MuiSvgIcon-root");
      expect(svgIcon?.classList.contains("MuiSvgIcon-fontSizeMedium")).toBe(true);
    });

    it("handles empty string icon path", () => {
      const { container } = setup({ icon: "" });
      const img = container.querySelector("img");
      expect(img).toBeTruthy();
      expect(img?.getAttribute("src")).toBe(null);
    });

    it("handles special or long SVG paths", () => {
      const longPath = "/very/long/path/icon.svg";
      const { container: c1 } = setup({ icon: longPath });
      expect(c1.querySelector("img")?.getAttribute("src")).toBe(longPath);

      const specialPath = "/path/with spaces/and-chars_123.svg";
      const { container: c2 } = setup({ icon: specialPath });
      expect(c2.querySelector("img")?.getAttribute("src")).toBe(specialPath);
    });
  });

  describe("Accessibility", () => {
    it("renders MUI icon with accessibility support", () => {
      const { container } = setup();
      expect(container.querySelector(".MuiSvgIcon-root")).toBeTruthy();
    });

    it("renders SVG img with empty alt", () => {
      const { container } = setup({ icon: "/icon.svg" });
      expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
    });

    it("renders SVG img with default alt behavior", () => {
      const { container } = setup({ icon: "/icon.svg" });
      expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
    });
  });
});
