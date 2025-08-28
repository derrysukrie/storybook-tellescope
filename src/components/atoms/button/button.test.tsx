/** @vitest-environment jsdom */

import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '../../../../test/test-utils'
import { Button } from './button'

const renderWithTheme = render

describe('Button', () => {
    it('exports component', () => {
        expect(Button).toBeDefined()
        expect(typeof Button).toBe('function')
    })

    it('renders children and accessible name', () => {
        const { getByRole } = renderWithTheme(<Button>Click me</Button>)
        expect(getByRole('button', { name: 'Click me' })).toBeTruthy()
    })

    it('respects aria-label for accessible name', () => {
        const { getByRole } = renderWithTheme(<Button aria-label="Do action">Click me</Button>)
        expect(getByRole('button', { name: 'Do action' })).toBeTruthy()
    })

    it('calls onClick when enabled', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        const { getByRole } = renderWithTheme(<Button onClick={onClick}>Run</Button>)
        await user.click(getByRole('button', { name: 'Run' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const onClick = vi.fn()
        const { getByRole } = renderWithTheme(
            <Button disabled onClick={onClick}>
                Run
            </Button>
        )
        const btn = getByRole('button', { name: 'Run' })
        expect((btn as HTMLButtonElement).disabled).toBe(true)
        // Use fireEvent for disabled element; userEvent blocks on pointer-events: none
        fireEvent.click(btn)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('maps appearance to MUI variant (contained|outlined|text)', () => {
        const { container, rerender } = renderWithTheme(<Button appearance="contained">A</Button>)
        expect(container.querySelector('.MuiButton-contained')).not.toBeNull()

        rerender(<Button appearance="outlined">A</Button>)
        expect(container.querySelector('.MuiButton-outlined')).not.toBeNull()

        rerender(<Button appearance="text">A</Button>)
        expect(container.querySelector('.MuiButton-text')).not.toBeNull()
    })

    it('maps color to MUI color classes', () => {
        const { container, rerender } = renderWithTheme(
            <Button appearance="contained" color="primary">
                A
            </Button>
        )
        expect(container.querySelector('.MuiButton-containedPrimary')).not.toBeNull()

        rerender(
            <Button appearance="contained" color="secondary">
                A
            </Button>
        )
        expect(container.querySelector('.MuiButton-containedSecondary')).not.toBeNull()

        rerender(
            <Button appearance="contained" color="info">
                A
            </Button>
        )
        expect(container.querySelector('.MuiButton-containedInfo')).not.toBeNull()
    })

    it('maps size to MUI size classes (small|medium|large)', () => {
        const { container, rerender } = renderWithTheme(<Button size="small">A</Button>)
        expect(container.querySelector('.MuiButton-sizeSmall')).not.toBeNull()

        rerender(<Button size="medium">A</Button>)
        expect(container.querySelector('.MuiButton-sizeMedium')).not.toBeNull()

        rerender(<Button size="large">A</Button>)
        expect(container.querySelector('.MuiButton-sizeLarge')).not.toBeNull()
    })

    it('forwards arbitrary props (data-testid)', () => {
        const { getByTestId } = renderWithTheme(<Button data-testid="btn">X</Button>)
        expect(getByTestId('btn')).toBeTruthy()
    })
})
