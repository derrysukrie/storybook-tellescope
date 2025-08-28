/** @vitest-environment jsdom */

import { Checkbox } from '@mui/material'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import { FormControlLabel } from './FormControlLabel'

describe('FormControlLabel', () => {
    const setup = (props?: Partial<React.ComponentProps<typeof FormControlLabel>>) => {
        const defaultProps = {
            control: <Checkbox />,
            label: 'Test Label',
            ...props,
        }
        return render(<FormControlLabel {...defaultProps} />)
    }

    it('exports component', () => {
        expect(FormControlLabel).toBeDefined()
        expect(typeof FormControlLabel).toBe('function')
    })

    it('renders label correctly', () => {
        setup()
        expect(screen.getByText('Test Label')).toBeTruthy()
    })

    it('renders control correctly', () => {
        setup()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeTruthy()
    })

    it('renders with default props', () => {
        const { container } = setup()
        const formControlLabel = container.querySelector('.MuiFormControlLabel-root')
        expect(formControlLabel).toBeTruthy()

        // Check default labelPlacement
        expect(formControlLabel?.classList.contains('MuiFormControlLabel-labelPlacementEnd')).toBe(
            true
        )
    })

    it('applies different label placements', () => {
        const { container: endContainer } = setup({ labelPlacement: 'end' })
        const { container: startContainer } = setup({ labelPlacement: 'start' })
        const { container: topContainer } = setup({ labelPlacement: 'top' })
        const { container: bottomContainer } = setup({ labelPlacement: 'bottom' })

        const endLabel = endContainer.querySelector('.MuiFormControlLabel-root')
        const startLabel = startContainer.querySelector('.MuiFormControlLabel-root')
        const topLabel = topContainer.querySelector('.MuiFormControlLabel-root')
        const bottomLabel = bottomContainer.querySelector('.MuiFormControlLabel-root')

        expect(endLabel?.classList.contains('MuiFormControlLabel-labelPlacementEnd')).toBe(true)
        expect(startLabel?.classList.contains('MuiFormControlLabel-labelPlacementStart')).toBe(true)
        expect(topLabel?.classList.contains('MuiFormControlLabel-labelPlacementTop')).toBe(true)
        expect(bottomLabel?.classList.contains('MuiFormControlLabel-labelPlacementBottom')).toBe(
            true
        )
    })

    it('renders as FormControlLabel component', () => {
        const { container } = setup()
        const formControlLabel = container.querySelector('label')
        expect(formControlLabel).toBeTruthy()
        expect(formControlLabel?.classList.contains('MuiFormControlLabel-root')).toBe(true)
    })

    it('handles different control types', () => {
        const { rerender } = setup({ control: <Checkbox /> })
        expect(screen.getByRole('checkbox')).toBeTruthy()

        // Test with different control
        const Radio = () => <input type="radio" data-testid="radio" />
        rerender(<FormControlLabel control={<Radio />} label="Radio Label" />)
        expect(screen.getByTestId('radio')).toBeTruthy()
    })

    it('handles empty label', () => {
        const { container } = setup({ label: '' })
        const formControlLabel = container.querySelector('.MuiFormControlLabel-root')
        expect(formControlLabel).toBeTruthy()
        const labelSpan = container.querySelector('.MuiFormControlLabel-label')
        expect(labelSpan?.textContent).toBe('')
    })

    it('handles complex label content', () => {
        const complexLabel = (
            <span>
                <strong>Bold</strong> and <em>italic</em> label
            </span>
        )

        const { container } = setup({ label: complexLabel })

        expect(screen.getByText('Bold')).toBeTruthy()
        expect(screen.getByText('italic')).toBeTruthy()
        // Check that the label contains the complex content
        const labelSpan = container.querySelector('.MuiFormControlLabel-label')
        expect(labelSpan?.textContent?.trim()).toBe('Bold and italic label')
    })

    it('forwards all MUI FormControlLabel props', () => {
        const { container } = setup({
            control: <Checkbox />,
            label: 'Test Label',
            labelPlacement: 'start',
        })

        const formControlLabel = container.querySelector('.MuiFormControlLabel-root')
        expect(formControlLabel).toBeTruthy()
        expect(
            formControlLabel?.classList.contains('MuiFormControlLabel-labelPlacementStart')
        ).toBe(true)
    })

    it('handles disabled control', () => {
        setup({ control: <Checkbox disabled /> })
        const checkbox = screen.getByRole('checkbox')
        expect((checkbox as HTMLInputElement).disabled).toBe(true)
    })

    it('handles checked control', () => {
        setup({ control: <Checkbox defaultChecked /> })
        const checkbox = screen.getByRole('checkbox')
        expect((checkbox as HTMLInputElement).checked).toBe(true)
    })

    it('maintains proper accessibility', () => {
        setup()
        const formControlLabel = screen.getByRole('checkbox').closest('label')
        expect(formControlLabel).toBeTruthy()
        expect(formControlLabel?.classList.contains('MuiFormControlLabel-root')).toBe(true)
    })
})
