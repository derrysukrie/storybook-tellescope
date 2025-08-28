/** @vitest-environment jsdom */

import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '../../../../test/test-utils'
import { IconButton } from './icon-button'

describe('IconButton', () => {
    it('exports component', () => {
        expect(IconButton).toBeDefined()
        expect(typeof IconButton).toBe('function')
    })

    it('is accessible by role and name via aria-label', () => {
        render(<IconButton aria-label="Add" />)
        expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy()
    })

    it('calls onClick when enabled', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        render(<IconButton aria-label="Run" onClick={onClick} />)
        await user.click(screen.getByRole('button', { name: 'Run' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const onClick = vi.fn()
        render(<IconButton aria-label="Run" disabled onClick={onClick} />)
        const btn = screen.getByRole('button', { name: 'Run' })
        expect((btn as HTMLButtonElement).disabled).toBe(true)
        fireEvent.click(btn)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('applies color classes', () => {
        const { container, rerender } = render(<IconButton aria-label="icon" color="primary" />)
        expect(container.querySelector('.MuiIconButton-colorPrimary')).not.toBeNull()

        rerender(<IconButton aria-label="icon" color="secondary" />)
        expect(container.querySelector('.MuiIconButton-colorSecondary')).not.toBeNull()

        rerender(<IconButton aria-label="icon" color="info" />)
        expect(container.querySelector('.MuiIconButton-colorInfo')).not.toBeNull()

        rerender(<IconButton aria-label="icon" color="default" />)
        // default should not apply other explicit color classes
        const root = container.querySelector('.MuiIconButton-root') as HTMLElement | null
        expect(root).not.toBeNull()
        expect(root?.className).not.toMatch(
            /MuiIconButton-colorPrimary|MuiIconButton-colorSecondary|MuiIconButton-colorInfo/
        )
    })

    it('applies size classes including custom table size', () => {
        const { container, rerender } = render(<IconButton aria-label="icon" size="small" />)
        expect(container.querySelector('.MuiIconButton-sizeSmall')).not.toBeNull()

        rerender(<IconButton aria-label="icon" size="medium" />)
        expect(container.querySelector('.MuiIconButton-sizeMedium')).not.toBeNull()

        rerender(<IconButton aria-label="icon" size="large" />)
        expect(container.querySelector('.MuiIconButton-sizeLarge')).not.toBeNull()

        rerender(<IconButton aria-label="icon" size="table" />)
        expect(container.querySelector('.MuiIconButton-sizeTable')).not.toBeNull()
    })

    it('forwards arbitrary props (data-testid)', () => {
        render(<IconButton aria-label="icon" data-testid="icon-btn" />)
        expect(screen.getByTestId('icon-btn')).toBeTruthy()
    })
})
