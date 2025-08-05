import type { Preview } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../src/theme"; // Adjust this path based on your folder structure

const decorator = [
  (Story: any) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

const preview: Preview = {
  decorators: decorator,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
