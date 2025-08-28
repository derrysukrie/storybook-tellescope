import { createTheme, ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AttachedFile } from './AttachedFile'

function renderWithTheme(ui: React.ReactElement) {
    const theme = createTheme()
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AttachedFile - props', () => {
    it('exports component', () => {
        expect(AttachedFile).toBeDefined()
        expect(typeof AttachedFile).toBe('function')
    })

    it('renders defaults when props are omitted', () => {
        renderWithTheme(<AttachedFile />)

        // cek fallback UI
        expect(screen.getByText('file...')).toBeTruthy()
        expect(screen.getByText('jpeg')).toBeTruthy()

        // cek button remove default
        expect(screen.getByLabelText('Remove file...')).toBeTruthy()

        // cek title attribute di file name
        expect(screen.getByTitle('file...')).toBeTruthy()
    })

    it('renders provided fileName and fileType', () => {
        renderWithTheme(<AttachedFile fileName="report.pdf" fileType="pdf" />)

        expect(screen.getByText('report.pdf')).toBeTruthy()
        expect(screen.getByText('pdf')).toBeTruthy()
        expect(screen.getByLabelText('Remove report.pdf')).toBeTruthy()
        expect(screen.getByTitle('report.pdf')).toBeTruthy()
    })

    it('accepts onRemove prop and calls it on click', async () => {
        const user = userEvent.setup()
        const handleRemove = vi.fn()

        renderWithTheme(<AttachedFile fileName="x.png" fileType="png" onRemove={handleRemove} />)

        const removeButton = screen.getByLabelText('Remove x.png')
        expect(removeButton).toBeTruthy()

        await user.click(removeButton)
        expect(handleRemove).toHaveBeenCalledTimes(1)
    })

    it('onRemove must be a function (TS check)', () => {
        // @ts-expect-error onRemove should be a function
        renderWithTheme(<AttachedFile onRemove={123} />)
        expect(screen.getByText('file...')).toBeTruthy()
    })
})
