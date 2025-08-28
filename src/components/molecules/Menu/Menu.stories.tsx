// components/Menu/Menu.stories.tsx

import Star from '@mui/icons-material/Star'
import { Button, Divider } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
    title: 'Molecules/Menu',
    component: Menu,

    argTypes: {
        search: { control: 'boolean' },
        dense: { control: 'boolean' },
    },
}
export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
    render: args => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
        const [selected, setSelected] = useState<string | null>(null)
        const [checked, setChecked] = useState<string[]>([])
        const [switches, setSwitches] = useState<Record<string, boolean>>({})

        const open = Boolean(anchorEl)
        const handleClose = () => setAnchorEl(null)

        return (
            <div>
                <Button onClick={e => setAnchorEl(e.currentTarget)}>Open Menu</Button>
                <Menu
                    {...args}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{ borderRadius: '80px' }}
                >
                    <Menu.Item
                        selected={selected === 'Name'}
                        onClick={() => setSelected('Name')}
                        icon={<Star />}
                    >
                        Name
                    </Menu.Item>
                    <Menu.Item
                        selected={selected === 'Care Team'}
                        onClick={() => setSelected('Care Team')}
                    >
                        Care Team
                    </Menu.Item>

                    <Menu.Checkbox
                        checked={checked.includes('Appointments')}
                        onClick={() =>
                            setChecked(prev =>
                                prev.includes('Appointments')
                                    ? prev.filter(i => i !== 'Appointments')
                                    : [...prev, 'Appointments']
                            )
                        }
                    >
                        Appointments
                    </Menu.Checkbox>
                    <Menu.Checkbox
                        checked={checked.includes('Messages')}
                        onClick={() =>
                            setChecked(prev =>
                                prev.includes('Messages')
                                    ? prev.filter(i => i !== 'Messages')
                                    : [...prev, 'Messages']
                            )
                        }
                    >
                        Messages
                    </Menu.Checkbox>

                    <Menu.Switch
                        checked={switches.Documents ?? false}
                        onClick={() => setSwitches(p => ({ ...p, Documents: !p.Documents }))}
                    >
                        Documents
                    </Menu.Switch>
                </Menu>
            </div>
        )
    },
    args: {
        search: true,
        dense: false,
    },
}

export const Dense: Story = {
    render: args => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
        const [selected, setSelected] = useState<string | null>(null)
        const [checked, setChecked] = useState<string[]>([])
        const [switches, setSwitches] = useState<Record<string, boolean>>({})

        const open = Boolean(anchorEl)
        const handleClose = () => setAnchorEl(null)

        return (
            <div>
                <Button onClick={e => setAnchorEl(e.currentTarget)}>Open Dense Menu</Button>
                <Menu {...args} anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <Menu.Item
                        selected={selected === 'Name'}
                        onClick={() => setSelected('Name')}
                        icon={<Star />}
                    >
                        Name
                    </Menu.Item>
                    <Menu.Item
                        selected={selected === 'Care Team'}
                        onClick={() => setSelected('Care Team')}
                    >
                        Care Team
                    </Menu.Item>
                    <Divider />
                    <Menu.Checkbox
                        checked={checked.includes('Appointments')}
                        onClick={() =>
                            setChecked(prev =>
                                prev.includes('Appointments')
                                    ? prev.filter(i => i !== 'Appointments')
                                    : [...prev, 'Appointments']
                            )
                        }
                    >
                        Appointments
                    </Menu.Checkbox>
                    <Menu.Checkbox
                        checked={checked.includes('Messages')}
                        onClick={() =>
                            setChecked(prev =>
                                prev.includes('Messages')
                                    ? prev.filter(i => i !== 'Messages')
                                    : [...prev, 'Messages']
                            )
                        }
                    >
                        Messages
                    </Menu.Checkbox>
                    <Divider />
                    <Menu.Switch
                        checked={switches.Documents ?? false}
                        onClick={() => setSwitches(p => ({ ...p, Documents: !p.Documents }))}
                    >
                        Documents
                    </Menu.Switch>
                </Menu>
            </div>
        )
    },
    args: {
        search: true,
        dense: true,
    },
}

export const SecondaryMenu: Story = {
    render: args => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

        const open = Boolean(anchorEl)
        const handleClose = () => setAnchorEl(null)

        return (
            <div>
                <Button onClick={e => setAnchorEl(e.currentTarget)}>Open Menu</Button>
                <Menu {...args} anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <Menu.SubMenu text="More options">
                        <Menu.Item>Sub-item 1</Menu.Item>
                        <Menu.Item>Sub-item 2</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.Item>Logout</Menu.Item>
                </Menu>
            </div>
        )
    },
    args: {
        search: false,
        dense: false,
    },
}
