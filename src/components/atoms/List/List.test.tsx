/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { render } from '../../../../test/test-utils'
import '@testing-library/jest-dom'
import List from './List'

const renderWithTheme = render

describe('List', () => {
    it('exports component', () => {
        expect(List).toBeDefined()
        expect(typeof List).toBe('function')
    })

    it('renders with default props', () => {
        const { container } = renderWithTheme(<List />)
        const listElement = container.querySelector('.MuiList-root')
        expect(listElement).toBeTruthy()
    })

    it('applies dense prop correctly', () => {
        const { container, rerender } = renderWithTheme(<List density="normal" />)
        let listElement = container.querySelector('.MuiList-root')
        expect(listElement).not.toHaveClass('MuiList-dense')

        rerender(<List density="dense" />)
        listElement = container.querySelector('.MuiList-root')
        expect(listElement).toHaveClass('MuiList-dense')
    })

    it('defaults to normal density when not specified', () => {
        const { container } = renderWithTheme(<List />)
        const listElement = container.querySelector('.MuiList-root')
        expect(listElement).not.toHaveClass('MuiList-dense')
    })
})
