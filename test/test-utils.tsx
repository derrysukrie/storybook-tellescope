import { createTheme, ThemeProvider } from '@mui/material/styles'
import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import type React from 'react'
import type { PropsWithChildren } from 'react'

const AllProviders: React.FC<PropsWithChildren> = ({ children }) => {
    const theme = createTheme()
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
    return rtlRender(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { render }
