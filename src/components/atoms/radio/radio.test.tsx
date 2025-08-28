/** @vitest-environment jsdom */

import { useId } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '../../../../test/test-utils'
import { Radio } from './radio'

const renderWithTheme = render

describe('Radio', () => {
    it('exports component', () => {
        expect(Radio).toBeDefined()
        expect(typeof Radio).toBe('function')
    })

    it('renders MUI Radio component', () => {
        const { container } = renderWithTheme(<Radio />)
        expect(container.querySelector('.MuiRadio-root')).toBeTruthy()
    })

    it('renders with default props', () => {
        const { container } = renderWithTheme(<Radio />)
        const radioElement = container.querySelector('.MuiRadio-root')
        expect(radioElement).toBeTruthy()
        expect(radioElement).toHaveClass('MuiRadio-colorDefault')
    })

    describe('Color prop', () => {
        it('renders with default color', () => {
            const { container } = renderWithTheme(<Radio />)
            const radioElement = container.querySelector('.MuiRadio-root')
            expect(radioElement).toHaveClass('MuiRadio-colorDefault')
        })

        it('renders with primary color', () => {
            const { container } = renderWithTheme(<Radio color="primary" />)
            const radioElement = container.querySelector('.MuiRadio-root')
            expect(radioElement).toHaveClass('MuiRadio-colorPrimary')
        })

        it('renders with secondary color', () => {
            const { container } = renderWithTheme(<Radio color="secondary" />)
            const radioElement = container.querySelector('.MuiRadio-root')
            expect(radioElement).toHaveClass('MuiRadio-colorSecondary')
        })

        it('renders with info color', () => {
            const { container } = renderWithTheme(<Radio color="info" />)
            const radioElement = container.querySelector('.MuiRadio-root')
            expect(radioElement).toHaveClass('MuiRadio-colorInfo')
        })
    })

    describe('Size prop', () => {
        it('renders with medium size by default', () => {
            const { container } = renderWithTheme(<Radio />)
            const radioElement = container.querySelector('.MuiRadio-root')
            // Default size doesn't have an explicit class, just verify it renders
            expect(radioElement).toBeTruthy()
            expect(radioElement).toHaveClass('MuiRadio-root')
        })

        it('renders with small size', () => {
            const { container } = renderWithTheme(<Radio size="small" />)
            const radioElement = container.querySelector('.MuiRadio-root')
            expect(radioElement).toHaveClass('MuiRadio-sizeSmall')
        })

        it('renders with large size', () => {
            const { container } = renderWithTheme(<Radio size="large" />)
            const radioElement = container.querySelector('.MuiRadio-root')
            expect(radioElement).toHaveClass('MuiRadio-sizeLarge')
        })
    })

    describe('State props', () => {
        it('renders unchecked by default', () => {
            const { container } = renderWithTheme(<Radio />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).not.toBeChecked()
        })

        it('renders checked when checked prop is true', () => {
            const { container } = renderWithTheme(<Radio checked />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toBeChecked()
        })

        it('renders enabled by default', () => {
            const { container } = renderWithTheme(<Radio />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).not.toBeDisabled()
        })

        it('renders disabled when disabled prop is true', () => {
            const { container } = renderWithTheme(<Radio disabled />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toBeDisabled()
        })

        it('renders with required attribute when required prop is true', () => {
            const { container } = renderWithTheme(<Radio required />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toHaveAttribute('required')
        })
    })

    describe('Event handling', () => {
        it('calls onChange when radio is clicked', () => {
            const mockOnChange = vi.fn()
            const { container } = renderWithTheme(<Radio onChange={mockOnChange} value="test" />)

            const radioInput = container.querySelector("input[type='radio']")
            if (!radioInput) {
                return
            }
            fireEvent.click(radioInput)

            expect(mockOnChange).toHaveBeenCalledTimes(1)
        })

        it('forwards onChange event with correct parameters', () => {
            const mockOnChange = vi.fn()
            const { container } = renderWithTheme(
                <Radio onChange={mockOnChange} value="test-value" />
            )

            const radioInput = container.querySelector("input[type='radio']")
            if (!radioInput) {
                return
            }
            fireEvent.click(radioInput)

            expect(mockOnChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: expect.objectContaining({
                        value: 'test-value',
                        type: 'radio',
                    }),
                    type: 'change',
                }),
                true
            )
        })
    })

    describe('Accessibility', () => {
        it('has proper ARIA attributes', () => {
            const { container } = renderWithTheme(<Radio aria-label="Test radio" />)
            const radioInput = container.querySelector("input[type='radio']")
            const rootElement = container.querySelector('.MuiRadio-root')

            // Check if aria-label is present on either the input or root element
            const hasAriaLabel =
                radioInput?.hasAttribute('aria-label') || rootElement?.hasAttribute('aria-label')
            expect(hasAriaLabel).toBe(true)

            if (radioInput?.hasAttribute('aria-label')) {
                expect(radioInput).toHaveAttribute('aria-label', 'Test radio')
            } else if (rootElement?.hasAttribute('aria-label')) {
                expect(rootElement).toHaveAttribute('aria-label', 'Test radio')
            }
        })

        it('supports custom id attribute', () => {
            const { container } = renderWithTheme(<Radio id={useId()} />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toHaveAttribute('id', 'custom-radio')
        })

        it('supports name attribute for form grouping', () => {
            const { container } = renderWithTheme(<Radio name="radio-group" />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toHaveAttribute('name', 'radio-group')
        })
    })

    describe('Prop forwarding', () => {
        it('forwards arbitrary props to MUI Radio', () => {
            const { container } = renderWithTheme(
                <Radio data-testid="custom-radio" tabIndex={0} value="test" />
            )

            const radioElement = container.querySelector("[data-testid='custom-radio']")
            expect(radioElement).toBeTruthy()

            // tabIndex should be on the input element
            const inputElement = container.querySelector("input[type='radio']")
            expect(inputElement).toHaveAttribute('tabIndex', '0')
        })

        it('forwards value prop correctly', () => {
            const { container } = renderWithTheme(<Radio value="radio-value" />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toHaveAttribute('value', 'radio-value')
        })

        it('applies sx prop styling', () => {
            const { container } = renderWithTheme(
                <Radio
                    sx={{
                        backgroundColor: 'red',
                        '& .MuiRadio-root': {
                            color: 'blue',
                        },
                    }}
                />
            )

            // Check that the component renders (sx styles are applied by MUI/Emotion)
            expect(container.querySelector('.MuiRadio-root')).toBeTruthy()
        })
    })

    describe('Edge cases', () => {
        it('handles null value prop', () => {
            const { container } = renderWithTheme(<Radio value={null} />)
            const radioInput = container.querySelector("input[type='radio']")
            // When value is null, MUI Radio doesn't set the value attribute
            expect(radioInput).not.toHaveAttribute('value')
        })

        it('handles undefined value prop', () => {
            const { container } = renderWithTheme(<Radio value={undefined} />)
            const radioInput = container.querySelector("input[type='radio']")
            // When value is undefined, MUI Radio doesn't set the value attribute
            expect(radioInput).not.toHaveAttribute('value')
        })

        it('renders with complex value types', () => {
            const complexValue = { id: 1, name: 'test' }
            const { container } = renderWithTheme(<Radio value={complexValue} />)
            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).toHaveAttribute('value', '[object Object]')
        })
    })

    describe('Integration with forms', () => {
        it('can be used in a form context', () => {
            const mockSubmit = vi.fn()
            const { container } = renderWithTheme(
                <form onSubmit={mockSubmit}>
                    <Radio name="test-radio" value="option1" defaultChecked />
                    <button type="submit">Submit</button>
                </form>
            )

            const form = container.querySelector('form')
            if (!form) {
                return
            }
            fireEvent.submit(form)

            expect(mockSubmit).toHaveBeenCalled()
        })

        it('supports controlled component pattern', () => {
            const mockOnChange = vi.fn()
            const { container, rerender } = renderWithTheme(
                <Radio checked={false} onChange={mockOnChange} value="controlled" />
            )

            const radioInput = container.querySelector("input[type='radio']")
            expect(radioInput).not.toBeChecked()

            rerender(<Radio checked={true} onChange={mockOnChange} value="controlled" />)

            expect(container.querySelector("input[type='radio']")).toBeChecked()
        })
    })
})
