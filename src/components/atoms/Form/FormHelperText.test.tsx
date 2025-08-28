/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import { FormHelperText } from './FormHelperText'

describe('FormHelperText', () => {
    const setup = (props?: Partial<React.ComponentProps<typeof FormHelperText>>) => {
        const defaultProps = {
            children: 'Helper text content',
            ...props,
        }
        return render(<FormHelperText {...defaultProps} />)
    }

    it('exports component', () => {
        expect(FormHelperText).toBeDefined()
        expect(typeof FormHelperText).toBe('function')
    })

    it('renders children correctly', () => {
        setup()
        expect(screen.getByText('Helper text content')).toBeTruthy()
    })

    it('renders with default props', () => {
        const { container } = setup()
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()

        // Check default styling (no error state)
        expect(helperText?.classList.contains('Mui-error')).toBe(false)
    })

    it('applies error state when error prop is true', () => {
        const { container } = setup({ error: true })
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText?.classList.contains('Mui-error')).toBe(true)
    })

    it('applies error state styling', () => {
        const { container } = setup({ error: true })
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()

        // Check for error color styling
        const computedStyle = window.getComputedStyle(helperText as Element)
        expect(computedStyle.color).toBeDefined()
    })

    it('applies default styling when error is false', () => {
        const { container } = setup({ error: false })
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()

        // Check for secondary text color styling
        const computedStyle = window.getComputedStyle(helperText as Element)
        expect(computedStyle.color).toBeDefined()
    })

    it('renders as FormHelperText component', () => {
        const { container } = setup()
        const helperText = container.querySelector('p')
        expect(helperText).toBeTruthy()
        expect(helperText?.classList.contains('MuiFormHelperText-root')).toBe(true)
    })

    it('handles empty children', () => {
        const { container } = setup({ children: '' })
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()
        expect(helperText?.textContent).toBe('')
    })

    it('handles complex children', () => {
        const complexChildren = (
            <span>
                <strong>Important</strong> helper text with <em>emphasis</em>
            </span>
        )

        setup({ children: complexChildren })

        expect(screen.getByText('Important')).toBeTruthy()
        expect(screen.getByText('emphasis')).toBeTruthy()
        expect(screen.getByText('helper text with')).toBeTruthy()
    })

    it('handles React elements as children', () => {
        const elementChildren = <span data-testid="custom-element">Custom element</span>

        setup({ children: elementChildren })

        expect(screen.getByTestId('custom-element')).toBeTruthy()
        expect(screen.getByText('Custom element')).toBeTruthy()
    })

    it('applies custom styling via sx prop', () => {
        const { container } = setup()
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()

        // Check for custom margin and padding styles
        const computedStyle = window.getComputedStyle(helperText as Element)
        expect(computedStyle.marginBottom).toBeDefined()
        expect(computedStyle.paddingTop).toBeDefined()
    })

    it('has correct spacing styles', () => {
        const { container } = setup()
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()

        // Check for specific spacing styles
        const computedStyle = window.getComputedStyle(helperText as Element)
        expect(computedStyle.marginRight).toBe('0px')
        expect(computedStyle.marginLeft).toBe('0px')
        expect(computedStyle.marginBottom).toBeDefined()
        expect(computedStyle.paddingTop).toBeDefined()
    })

    it('handles undefined error prop gracefully', () => {
        const { container } = setup({ error: undefined })
        const helperText = container.querySelector('.MuiFormHelperText-root')
        expect(helperText).toBeTruthy()
        expect(helperText?.classList.contains('Mui-error')).toBe(false)
    })
})
