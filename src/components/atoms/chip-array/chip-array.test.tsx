/** @vitest-environment jsdom */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { render } from '../../../../test/test-utils'
import ChipArray from './chip-array'

const renderWithTheme = render

const sampleData = [
    { key: 'a', label: 'Alpha' },
    { key: 'b', label: 'Beta' },
    { key: 'c', label: 'Gamma' },
]

describe('ChipArray', () => {
    it('exports component', () => {
        expect(ChipArray).toBeDefined()
        expect(typeof ChipArray).toBe('function')
    })

    it('renders provided label and chips', () => {
        const { getByText } = renderWithTheme(<ChipArray data={sampleData} label="Options" />)
        expect(getByText('Options')).toBeTruthy()
        expect(getByText('Alpha')).toBeTruthy()
        expect(getByText('Beta')).toBeTruthy()
        expect(getByText('Gamma')).toBeTruthy()
    })

    it('deletes a chip when withDelete is true (default)', async () => {
        const user = userEvent.setup()
        renderWithTheme(<ChipArray data={sampleData} />)
        // Each chip with onDelete renders a delete button inside the chip
        // biome-ignore lint/style/noNonNullAssertion: Storybook stories use static IDs
        const alphaChip = screen.getByText('Alpha').closest('.MuiChip-root')!

        const deleteIcon = alphaChip.querySelector('.MuiChip-deleteIcon') as HTMLElement
        expect(deleteIcon).toBeTruthy()
        await user.click(deleteIcon)
        expect(screen.queryByText('Alpha')).toBeNull()
    })

    it('toggles selection styles and icon when selectable', async () => {
        const user = userEvent.setup()
        const { getByText } = renderWithTheme(<ChipArray data={sampleData} selectable />)
        const betaLabel = getByText('Beta')
        // biome-ignore lint/style/noNonNullAssertion: Storybook stories use static IDs
        const betaChip = betaLabel.closest('.MuiChip-root')!

        // Initially outlined when selectable and not selected
        expect(betaChip.className).toContain('MuiChip-outlined')

        await user.click(betaChip)
        // Now filled and shows an icon when selected
        expect(betaChip.className).toContain('MuiChip-filled')
        expect(betaChip.querySelector('.MuiChip-icon')).not.toBeNull()

        await user.click(betaChip)
        // Toggled back to outlined and icon removed
        expect(betaChip.className).toContain('MuiChip-outlined')
        expect(betaChip.querySelector('.MuiChip-icon')).toBeNull()
    })

    it('forwards ListProps and chipProps (aria-label)', () => {
        const { getByRole, getAllByLabelText } = renderWithTheme(
            <ChipArray
                data={sampleData}
                ListProps={{ 'aria-label': 'list' }}
                chipProps={{ 'aria-label': 'chip' }}
            />
        )
        expect(getByRole('list', { name: 'list' })).toBeTruthy()
        expect(getAllByLabelText('chip').length).toBe(sampleData.length)
    })
})
