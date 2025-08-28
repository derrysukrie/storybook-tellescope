/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { render } from '../../../../test/test-utils'
import LinearProgress from './Progress'

const renderWithTheme = render

describe('LinearProgress', () => {
    it('exports component', () => {
        expect(LinearProgress).toBeDefined()
        expect(typeof LinearProgress).toBe('function')
    })

    it('renders MUI LinearProgress component', () => {
        const { container } = renderWithTheme(<LinearProgress />)
        expect(container.querySelector('.MuiLinearProgress-root')).toBeTruthy()
    })

    it('forwards arbitrary props to MUI LinearProgress', () => {
        const { container } = renderWithTheme(
            <LinearProgress
                value={50}
                variant="determinate"
                color="primary"
                data-testid="progress-bar"
            />
        )

        const progressElement = container.querySelector('.MuiLinearProgress-root')
        expect(progressElement).toBeTruthy()
        expect(container.querySelector('[data-testid="progress-bar"]')).toBeTruthy()
    })

    it('applies sx prop styling', () => {
        const { container } = renderWithTheme(
            <LinearProgress
                sx={{
                    backgroundColor: 'red',
                    height: '10px',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'blue',
                    },
                }}
            />
        )

        // Check that the component renders (sx styles are applied by MUI/Emotion)
        expect(container.querySelector('.MuiLinearProgress-root')).toBeTruthy()
    })

    it('renders with different variants', () => {
        const { container, rerender } = renderWithTheme(<LinearProgress variant="indeterminate" />)
        expect(container.querySelector('.MuiLinearProgress-root')).toBeTruthy()

        rerender(<LinearProgress variant="determinate" value={75} />)
        expect(container.querySelector('.MuiLinearProgress-root')).toBeTruthy()
    })

    it('renders with different colors', () => {
        const { container, rerender } = renderWithTheme(<LinearProgress color="primary" />)
        expect(container.querySelector('.MuiLinearProgress-root')).toBeTruthy()

        rerender(<LinearProgress color="secondary" />)
        expect(container.querySelector('.MuiLinearProgress-root')).toBeTruthy()
    })
})
