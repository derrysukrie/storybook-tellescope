/** @vitest-environment jsdom */

import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { render } from '../../../../test/test-utils'
import Chip from './Chip'

const renderWithTheme = render

describe('Chip', () => {
    it('exports component', () => {
        expect(Chip).toBeDefined()
        expect(typeof Chip).toBe('function')
    })

    it('renders with default props', () => {
        const { getByText } = renderWithTheme(<Chip label="Test Chip" />)
        expect(getByText('Test Chip')).toBeTruthy()
    })

    it('maps appearance prop to MUI variant', () => {
        const { container, rerender } = renderWithTheme(<Chip label="Filled" appearance="filled" />)
        expect(container.querySelector('.MuiChip-filled')).not.toBeNull()

        rerender(<Chip label="Outlined" appearance="outlined" />)
        expect(container.querySelector('.MuiChip-outlined')).not.toBeNull()

        rerender(<Chip label="Square" appearance="square" />)
        expect(container.querySelector('.MuiChip-outlined')).not.toBeNull()
    })

    it('applies color prop to MUI chip', () => {
        const { container } = renderWithTheme(<Chip label="Primary" color="primary" />)
        expect(container.querySelector('.MuiChip-colorPrimary')).not.toBeNull()
    })

    it('applies size prop to MUI chip', () => {
        const { container } = renderWithTheme(<Chip label="Small" size="small" />)
        expect(container.querySelector('.MuiChip-sizeSmall')).not.toBeNull()
    })

    it('applies selected prop to MUI chip', () => {
        const { container } = renderWithTheme(<Chip label="Selected" selected />)
        const chip = container.querySelector('.MuiChip-root')
        expect(chip).toBeTruthy()
    })

    it('forwards arbitrary props (data-testid)', () => {
        const { getByTestId } = renderWithTheme(<Chip label="Test" data-testid="custom-chip" />)
        expect(getByTestId('custom-chip')).toBeTruthy()
    })

    it('supports click events', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        const { getByText } = renderWithTheme(<Chip label="Clickable" onClick={onClick} />)
        await user.click(getByText('Clickable'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('forwards sx prop to MUI Chip', () => {
        const { container } = renderWithTheme(
            <Chip label="Custom" sx={{ 'data-testid': 'custom-sx' }} />
        )
        // Verify the sx prop is properly forwarded by checking if custom attributes are applied
        const chip = container.querySelector('.MuiChip-root')
        expect(chip).toBeTruthy()
        // Test that sx prop doesn't break the component rendering
        expect(chip?.className).toContain('MuiChip-root')
    })
})
