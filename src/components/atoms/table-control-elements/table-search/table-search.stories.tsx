import type { Meta, StoryObj } from '@storybook/react-vite'
import { type ComponentProps, useEffect, useState } from 'react'
import TableSearch from './table-search'

type StoryProps = ComponentProps<typeof TableSearch> & {
    hasValue: boolean
}

const meta = {
    title: 'ATOMS/TableControlElements/TableSearch',
    component: TableSearch,
    parameters: {
        controls: {
            exclude: ['small', 'children', 'value', 'onChange'],
        },
    },
    argTypes: {
        expanded: {
            control: { type: 'boolean' },
        },
        hasValue: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Default: Story = {
    args: {
        hasValue: true,
        expanded: false,
    },
    render: args => {
        const [value, setValue] = useState<string>('')
        const handleOnChange = (newValue: string) => {
            setValue(newValue)
        }
        const { hasValue, ...rest } = args as StoryProps

        useEffect(() => {
            if (hasValue) {
                setValue('Organization')
            } else {
                setValue('')
            }
        }, [hasValue])

        return <TableSearch {...rest} value={value} onChange={handleOnChange} />
    },
}
