/** @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import TimeInput from "./time-input";

describe("TimeInput", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof TimeInput>>) => {
    const utils = render(<TimeInput {...props} />);
    const input = utils.container.querySelector("input") as HTMLInputElement;
    return { input, ...utils };
  };

  it("exports component", () => {
    expect(TimeInput).toBeDefined();
    expect(typeof TimeInput).toBe("function");
  });

  it("renders input without label by default", () => {
    const { input, container } = setup();
    expect(input).toBeTruthy();
    expect(container.querySelector(".MuiFormLabel-root")).toBeNull();
  });

  it("renders with label when prop is true", () => {
    const { input, container } = setup({ label: true });
    expect(input).toBeTruthy();
    expect(container.querySelector(".MuiFormLabel-root")?.textContent).toBe("Time label");
  });

  it("starts with '00' in uncontrolled mode", () => {
    const { input } = setup();
    expect(input.value).toBe("00");
  });

  it("uses provided value in controlled mode", () => {
    const { input } = setup({ value: "25" });
    expect(input.value).toBe("25");
  });

  it("filters out non-digit characters", () => {
    const onChange = vi.fn();
    const { input } = setup({ value: "", onChange });
    fireEvent.change(input, { target: { value: "abc123def" } });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "23" }) // last 2 digits
      })
    );
  });

  it("handles single and two digit input", () => {
    const onChange = vi.fn();
    const { input } = setup({ value: "", onChange });

    fireEvent.change(input, { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: "5" })
    }));

    fireEvent.change(input, { target: { value: "59" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: "59" })
    }));
  });

  it("takes last two digits for longer input", () => {
    const onChange = vi.fn();
    const { input } = setup({ value: "", onChange });
    fireEvent.change(input, { target: { value: "12345" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: "45" })
    }));
  });

  it("handles empty input", () => {
    const onChange = vi.fn();
    const { input } = setup({ value: "25", onChange });
    fireEvent.change(input, { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: "" })
    }));
  });

  it("updates internal state in uncontrolled mode", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "30" } });
    expect(input.value).toBe("30");
  });

  it("does not update internal state in controlled mode", () => {
    const onChange = vi.fn();
    const { input } = setup({ value: "25", onChange });
    fireEvent.change(input, { target: { value: "30" } });
    expect(input.value).toBe("25");
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards props to Input", () => {
    const { input } = setup({ placeholder: "Enter time", disabled: true, id: "time-input" });
    expect(input.placeholder).toBe("Enter time");
    expect(input.disabled).toBe(true);
    expect(input.id).toBe("time-input");
  });

  it("applies custom styling via sx", () => {
    const { container } = setup({ sx: { backgroundColor: "red" } });
    expect(container.querySelector(".MuiInputBase-root")).toBeTruthy();
  });

  it("renders with outlined appearance", () => {
    const { container } = setup();
    expect(container.querySelector(".MuiOutlinedInput-root")).toBeTruthy();
  });

  it("shows focus styles when focused", async () => {
    const user = userEvent.setup({ delay: null });
    const { input, container } = setup({ label: true });
    await user.click(input);
    expect(container.querySelector(".Mui-focused")).toBeTruthy();
  });

  it("handles paste events with mixed characters", () => {
    const onChange = vi.fn();
    const { input } = setup({ value: "", onChange });
    fireEvent.paste(input, { clipboardData: { getData: () => "1a2b3c4" } });
    fireEvent.change(input, { target: { value: "1a2b3c4" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: "34" })
    }));
  });
});
