import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import SentChat from "./SentChat";


const renderWithTheme = render;

describe("SentChat", () => {
  it("renders with default props", () => {
    const { container } = renderWithTheme(<SentChat message="Hello" />);
    expect(container).toBeTruthy();
  });

  it("renders with message prop", () => {
    const { getByText } = renderWithTheme(<SentChat message="Hello" />);
    expect(getByText("Hello")).toBeTruthy();
  });
});
