import type { Meta, StoryObj } from "@storybook/react";
import { FormGroup } from ".";
import React from "react";

const meta: Meta = {
  title: "Molecules/FormGroup",
};

export default meta;

export const Radio: StoryObj = {
  render: () => (
    <FormGroup.Radio
      onChange={(value) => console.log("onChange", value)}
      label="Radio Group"
      helperText="This is a helper text"
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ]}
    />
  ),
};

export const Checkbox: StoryObj = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <FormGroup.Checkbox
        onChange={(values) => setValue(values)}
        value={value}
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
          { label: "Option 3", value: "3" },
        ]}
        label="Checkbox Group"
        helperText="This is a helper text"
      />
    );
  },
};

export const Text: StoryObj = {
  render: () => {
     
    const [value, setValue] = React.useState<Record<string, string>>({});

    return (
      <FormGroup.Text
        label="Text Group"
        helperText="This is a helper text"
        options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Switch: StoryObj = {
  render: () => (
    <FormGroup.Switch
      onChange={(values) => console.log("onChange", values)}
      label="Switch Group"
      helperText="This is a helper text"
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ]}
    />
  ),
};

// export const SwitchControlled: StoryObj = {
//   render: () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [activeSwitches, setActiveSwitches] = React.useState<string[]>(["1"]);

//     return (
//       <FormGroup.Switch
//         label="Controlled Switch Group"
//         helperText="This is a controlled switch group with initial selection"
//         options={[
//           { label: "Option 1", value: "1" },
//           { label: "Option 2", value: "2" },
//           { label: "Option 3", value: "3" },
//         ]}
//         value={activeSwitches}
//         onChange={(values) => {
//           console.log("Controlled onChange:", values);
//           setActiveSwitches(values);
//         }}
//       />
//     );
//   },
// };

export const TextArea: StoryObj = {
  render: () => (
    <FormGroup.TextArea
      label="Text Area Group"
      helperText="This is a helper text"
      options={[{ label: "Option 1", value: "1" }]}
    />
  ),
};

export const Select: StoryObj = {
  render: () => (
    <FormGroup.Select
      label="Select Group"
      onChange={(value) => console.log("onChange", value)}
      helperText="This is a helper text"
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ]}
    />
  ),
};

export const Selectable: StoryObj = {
  render: () => (
    <FormGroup.Selectable
      label="Selectable Group"
      labelSize="large"
      onChange={(values) => console.log("onChange", values)}
      helperText="This is a helper text"
      options={[
        { id: "1", label: "This is a selectable  question ", value: "value1" },
        { id: "2", label: "This is a selectable  question ", value: "value2" },
        { id: "3", label: "This is a selectable  question ", value: "value3" },
      ]}
    />
  ),
};
