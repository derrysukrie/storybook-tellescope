import { describe, it, expect } from "vitest";
import { render} from "../../../../test/test-utils";
import "@testing-library/jest-dom";
import ListItem from "./ListItem";

const renderWithTheme = render;

describe("ListItem", () => {
  it("renders correctly", () => {
    const { container } = renderWithTheme(<ListItem />);
    const listItemElement = container.querySelector(".MuiListItem-root");
    expect(listItemElement).toBeInTheDocument();
  });
});

