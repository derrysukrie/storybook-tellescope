import React, { type PropsWithChildren } from 'react';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AllProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { render };


