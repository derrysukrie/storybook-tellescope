import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import TagIcon from '@mui/icons-material/Tag'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import DetailSelect from './detail-select-default'

type StoryProps = ComponentProps<typeof DetailSelect> & {
    hasValue: boolean
    active: boolean
}

const meta = {
    title: 'MOLECULES/Table Elements/Detail Select',
    component: DetailSelect,
    parameters: {
        controls: {
            include: ['appearance', 'active', 'hasValue'],
        },
    },
    argTypes: {
        hasValue: {
            control: { type: 'boolean' },
        },
        active: {
            control: { type: 'boolean' },
        },
        appearance: {
            control: {
                type: 'select',
            },
            options: ['sort', 'filter'], // explicitly define options
        },
    },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

const availableSortFields = [
    { label: 'Name', value: 'name', icon: <PersonOutlineOutlinedIcon /> },
    { label: 'Care Team', value: 'care team', icon: <GroupOutlinedIcon /> },
    { label: 'Share Team', value: 'share team', icon: <GroupOutlinedIcon /> },
    { label: 'Journeys', value: 'journeys', icon: <ShowChartIcon /> },
    { label: 'Tags', value: 'tags', icon: <TagIcon /> },
]

const filterOptions = [
    { label: 'is', value: 'is' },
    { label: 'is not', value: 'is not' },
    { label: 'contains', value: 'contains' },
    { label: 'does not contain', value: 'does not contain' },
    { label: 'starts with', value: 'starts with' },
    { label: 'ends with', value: 'ends with' },
    { label: 'is empty', value: 'is empty' },
    { label: 'is not empty', value: 'is not empty' },
]

export const Default: Story = {
    args: {
        appearance: 'sort',
        active: false,
        hasValue: false,
    },
    render: (props: StoryProps) => {
        /* 
            - This methods helps developer make the component more interactive.
                - Appearance "Sort"
                    * onAddSort
                    * onDeleteSort
                    * onChangeSort
                    * onChangeSortOrder
                - Appearance "Filter"
                    * OnSetFilterOption
                    * OnSetFilterValue
                    * OnClearFilter
        */

        return (
            <>
                {props.appearance === 'sort' ? (
                    <DetailSelect
                        open={props.active}
                        appearance="sort"
                        availableSortFields={availableSortFields}
                        value={props.hasValue ? [{ field: 'name', order: 'ascending' }] : []}
                        // onChangeSort, onChangeSortOrder, onAddSort, onDeleteSort handlers can be added here
                    />
                ) : (
                    <DetailSelect
                        open={props.active}
                        appearance="filter"
                        filterOptions={filterOptions}
                        value={props.hasValue ? { value: 'a', filterOption: 'contains' } : null}
                        field="name"

                        // OnSetFilterOption, OnSetFilterValue, OnClearFilter handlers can be added here
                    />
                )}
            </>
        )
    },
}

/*
    Detail Select props needs to refactor to support the following:
    - appearance: 'sort'
    - sort: { field: string, order: 'ascending' | 'descending' }[]
    - setSort: React.Dispatch<React.SetStateAction<{ field: string, order: 'ascending' | 'descending' }[]>>
    - availableSortFields: { label: string, value: string, icon: JSX.Element }[]
    - onChangeSort?: (field: string, order: 'ascending' | 'descending') => void
    - onChangeSortOrder?: (field: string, order: 'ascending' | 'descending') => void
    - onAddSort?: (field: string) => void
    - onDeleteSort?: () => void
    Or
    - appearance: 'filter'
    - filter: { value: string, filterOption: string } | null
    - setFilter: React.Dispatch<React.SetStateAction<{ value: string, filterOption: string } | null>>
    - filterOptions: { label: string, value: string }[]
    - defaultOpen?: boolean
    - onChangeFilter?: (field: string) => void

    => depnding on the appearance
*/
