/** @vitest-environment jsdom */

import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '../../../../test/test-utils'
import ChatInput from './ChatInput'

describe('ChatInput - props', () => {
    it('exports component', () => {
        expect(ChatInput).toBeDefined()
        expect(typeof ChatInput).toBe('function')
    })

    it('renders default placeholder and controls send button disabled when empty', () => {
        render(<ChatInput />)
        expect(screen.getByPlaceholderText('Ask a question about this chat...')).toBeTruthy()
        const input = screen.getByLabelText('chat input') as HTMLInputElement
        const send = screen.getByRole('button', { name: 'send' }) as HTMLButtonElement
        expect(input.disabled).toBe(false)
        expect(send.disabled).toBe(true)
        // icon color reflects disabled state
        expect(document.querySelector('.MuiSvgIcon-colorDisabled')).not.toBeNull()
    })

    it('accepts custom placeholder', () => {
        render(<ChatInput placeholder="Type here" />)
        expect(screen.getByPlaceholderText('Type here')).toBeTruthy()
    })

    it('shows value and calls onChange', () => {
        const onChange = vi.fn()
        render(<ChatInput value="hello" onChange={onChange} />)
        const input = screen.getByLabelText('chat input') as HTMLInputElement
        expect(input.value).toBe('hello')
        fireEvent.change(input, { target: { value: 'updated' } })
        expect(onChange).toHaveBeenCalled()
    })

    it('calls onSend when submitting with non-empty value', async () => {
        const user = userEvent.setup()
        const onSend = vi.fn()
        render(<ChatInput value="Hi" onSend={onSend} />)
        const send = screen.getByRole('button', { name: 'send' })
        expect((send as HTMLButtonElement).disabled).toBe(false)
        await user.click(send)
        expect(onSend).toHaveBeenCalledTimes(1)
        // icon becomes primary when value is present
        expect(document.querySelector('.MuiSvgIcon-colorPrimary')).not.toBeNull()
    })

    it('disables input and send when disabled prop is true', () => {
        render(<ChatInput disabled value="Hi" />)
        const input = screen.getByLabelText('chat input') as HTMLInputElement
        const send = screen.getByRole('button', { name: 'send' }) as HTMLButtonElement
        expect(input.disabled).toBe(true)
        expect(send.disabled).toBe(true)
    })

    it('send button disabled when value is whitespace', () => {
        render(<ChatInput value="   " />)
        const send = screen.getByRole('button', { name: 'send' }) as HTMLButtonElement
        expect(send.disabled).toBe(true)
    })
})
