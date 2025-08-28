/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import { FormGroupLabel } from './FormGroupLabel'

describe('FormGroupLabel', () => {
    const setup = (props?: Partial<React.ComponentProps<typeof FormGroupLabel>>) => {
        const defaultProps = {
            children: 'Test Label',
            ...props,
        }
        return render(<FormGroupLabel {...defaultProps} />)
    }

    it('exports component', () => {
        expect(FormGroupLabel).toBeDefined()
        expect(typeof FormGroupLabel).toBe('function')
    })

    it('renders children correctly', () => {
        setup()
        expect(screen.getByText('Test Label')).toBeTruthy()
    })

    it('renders with default props', () => {
        const { container } = setup()
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label).toBeTruthy()

        // Check default styling
        expect(label?.classList.contains('Mui-disabled')).toBe(false)
        expect(label?.classList.contains('Mui-error')).toBe(false)
    })

    it('applies large label size styling', () => {
        const { container } = setup({ labelSize: 'large' })
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label).toBeTruthy()

        // Check for large font size styling
        const computedStyle = window.getComputedStyle(label as Element)
        expect(computedStyle.fontSize).toBe('1.25rem')
    })

    it('applies default label size styling', () => {
        const { container } = setup({ labelSize: 'default' })
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label).toBeTruthy()

        // Check for default font size styling
        const computedStyle = window.getComputedStyle(label as Element)
        expect(computedStyle.fontSize).toBe('1rem')
    })

    it('applies error state when error prop is true', () => {
        const { container } = setup({ error: true })
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label?.classList.contains('Mui-error')).toBe(true)
    })

    it('applies disabled state when disabled prop is true', () => {
        const { container } = setup({ disabled: true })
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label?.classList.contains('Mui-disabled')).toBe(true)
    })

    it('applies custom sx styling', () => {
        const customSx = { backgroundColor: 'red', color: 'white' }
        const { container } = setup({ sx: customSx })
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label).toBeTruthy()
    })

    it('renders as InputLabel component', () => {
        const { container } = setup()
        const inputLabel = container.querySelector('label')
        expect(inputLabel).toBeTruthy()
        expect(inputLabel?.classList.contains('MuiInputLabel-root')).toBe(true)
    })

    it('handles empty children', () => {
        const { container } = setup({ children: '' })
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label).toBeTruthy()
        expect(label?.textContent).toBe('')
    })

    it('handles complex children', () => {
        const complexChildren = (
            <span>
                <strong>Bold</strong> and <em>italic</em> text
            </span>
        )

        const { container } = setup({ children: complexChildren })

        expect(screen.getByText('Bold')).toBeTruthy()
        expect(screen.getByText('italic')).toBeTruthy()
        // Check that the label contains the complex content
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label?.textContent?.trim()).toBe('Bold and italic text')
    })

    it('combines multiple props correctly', () => {
        const { container } = setup({
            error: true,
            disabled: true,
            labelSize: 'large',
            sx: { fontWeight: 'bold' },
        })

        const label = container.querySelector('.MuiInputLabel-root')
        expect(label?.classList.contains('Mui-error')).toBe(true)
        expect(label?.classList.contains('Mui-disabled')).toBe(true)
    })

    it('has correct positioning styles', () => {
        const { container } = setup()
        const label = container.querySelector('.MuiInputLabel-root')
        expect(label).toBeTruthy()

        // Check for static positioning and no transform
        const computedStyle = window.getComputedStyle(label as Element)
        expect(computedStyle.position).toBe('static')
        expect(computedStyle.transform).toBe('none')
    })
})
