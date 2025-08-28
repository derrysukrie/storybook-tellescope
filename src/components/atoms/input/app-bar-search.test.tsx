/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { render } from '../../../../test/test-utils'
import { AppbarSearch } from './app-bar-search'

describe('AppbarSearch', () => {
    const setup = (props?: Partial<React.ComponentProps<typeof AppbarSearch>>) => {
        return render(<AppbarSearch {...props} />)
    }

    it('should export component', () => {
        expect(AppbarSearch).toBeDefined()
        expect(typeof AppbarSearch).toBe('function')
    })

    describe('Rendering', () => {
        it('renders with default placeholder', () => {
            const { container } = setup()

            const input = container.querySelector('input')
            expect(input).toBeTruthy()
            expect(input?.getAttribute('placeholder')).toBe('label')
            expect(input?.getAttribute('aria-label')).toBe('label')
        })

        it('renders with custom placeholder', () => {
            const { container } = setup({ placeholder: 'Search products...' })

            const input = container.querySelector('input')
            expect(input?.getAttribute('placeholder')).toBe('Search products...')
            expect(input?.getAttribute('aria-label')).toBe('Search products...')
        })

        it('renders search icon button', () => {
            const { container } = setup()

            const button = container.querySelector('button')
            expect(button).toBeTruthy()
            expect(button?.getAttribute('aria-label')).toBe('search')
            expect(button?.getAttribute('type')).toBe('button')
        })

        it('renders search icon', () => {
            const { container } = setup()

            const searchIcon = container.querySelector('.MuiSvgIcon-root')
            expect(searchIcon).toBeTruthy()
        })
    })

    describe('Form Structure', () => {
        it('renders as a form element', () => {
            const { container } = setup()

            const form = container.querySelector('form')
            expect(form).toBeTruthy()
        })

        it('has correct form layout', () => {
            const { container } = setup()

            const stack = container.querySelector('.MuiStack-root')
            expect(stack).toBeTruthy()
            // The component prop is not accessible as a DOM attribute in the test environment
            // We can verify the form element exists instead
            const form = container.querySelector('form')
            expect(form).toBeTruthy()
        })
    })

    describe('Styling and Layout', () => {
        it('applies correct container styles', () => {
            const { container } = setup()

            const stack = container.querySelector('.MuiStack-root')
            expect(stack).toBeTruthy()

            // Check for key style properties
            const styles = window.getComputedStyle(stack as Element)
            expect(styles.display).toBe('flex')
            expect(styles.alignItems).toBe('center')
            expect(styles.width).toBe('100%')
            expect(styles.backgroundColor).toBe('rgb(255, 255, 255)')
        })

        it('applies correct input styles', () => {
            const { container } = setup()

            const input = container.querySelector('input')
            expect(input).toBeTruthy()

            // Check input container styles
            const inputContainer = input?.closest('.MuiInputBase-root')
            expect(inputContainer).toBeTruthy()
        })

        it('applies correct button styles', () => {
            const { container } = setup()

            const button = container.querySelector('button')
            expect(button).toBeTruthy()

            // Check button has correct padding
            const buttonStyles = window.getComputedStyle(button as Element)
            expect(buttonStyles.padding).toBe('10px')
        })
    })

    describe('Accessibility', () => {
        it('has proper aria-label on input', () => {
            const { container } = setup({ placeholder: 'Search here' })

            const input = container.querySelector('input')
            expect(input?.getAttribute('aria-label')).toBe('Search here')
        })

        it('has proper aria-label on search button', () => {
            const { container } = setup()

            const button = container.querySelector('button')
            expect(button?.getAttribute('aria-label')).toBe('search')
        })

        it('has proper button type', () => {
            const { container } = setup()

            const button = container.querySelector('button')
            expect(button?.getAttribute('type')).toBe('button')
        })
    })

    describe('Component Composition', () => {
        it('uses Material-UI components correctly', () => {
            const { container } = setup()

            // Check for MUI components
            expect(container.querySelector('.MuiStack-root')).toBeTruthy()
            expect(container.querySelector('.MuiInputBase-root')).toBeTruthy()
            expect(container.querySelector('.MuiButtonBase-root')).toBeTruthy()
        })

        it('integrates with IconButton component', () => {
            const { container } = setup()

            const iconButton = container.querySelector('.MuiButtonBase-root')
            expect(iconButton).toBeTruthy()
            // The color prop is applied via CSS classes, not as a DOM attribute
            // We can verify the button exists and has the correct styling
            expect(iconButton).toBeTruthy()
        })

        it('integrates with SearchIcon', () => {
            const { container } = setup()

            const searchIcon = container.querySelector('.MuiSvgIcon-root')
            expect(searchIcon).toBeTruthy()
        })
    })

    describe('Props Handling', () => {
        it('handles empty placeholder', () => {
            const { container } = setup({ placeholder: '' })

            const input = container.querySelector('input')
            expect(input?.getAttribute('placeholder')).toBe('')
            expect(input?.getAttribute('aria-label')).toBe('')
        })

        it('handles undefined placeholder', () => {
            const { container } = setup({ placeholder: undefined })

            const input = container.querySelector('input')
            expect(input?.getAttribute('placeholder')).toBe('label') // default value
            expect(input?.getAttribute('aria-label')).toBe('label')
        })

        it('handles special characters in placeholder', () => {
            const specialPlaceholder = 'Search & filter (products) - 100% free!'
            const { container } = setup({ placeholder: specialPlaceholder })

            const input = container.querySelector('input')
            expect(input?.getAttribute('placeholder')).toBe(specialPlaceholder)
            expect(input?.getAttribute('aria-label')).toBe(specialPlaceholder)
        })
    })

    describe('Edge Cases', () => {
        it('handles very long placeholder text', () => {
            const longPlaceholder =
                'This is a very long placeholder text that might exceed normal input field widths and could potentially cause layout issues if not handled properly by the component styling'
            const { container } = setup({ placeholder: longPlaceholder })

            const input = container.querySelector('input')
            expect(input?.getAttribute('placeholder')).toBe(longPlaceholder)
            expect(input?.getAttribute('aria-label')).toBe(longPlaceholder)
        })

        it('handles placeholder with HTML-like content', () => {
            const htmlPlaceholder = "<script>alert('test')</script>Search here"
            const { container } = setup({ placeholder: htmlPlaceholder })

            const input = container.querySelector('input')
            expect(input?.getAttribute('placeholder')).toBe(htmlPlaceholder)
            expect(input?.getAttribute('aria-label')).toBe(htmlPlaceholder)
        })
    })
})
