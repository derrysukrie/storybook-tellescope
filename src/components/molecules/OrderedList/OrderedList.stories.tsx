import { useState } from 'storybook/internal/preview-api'
import { OrderedList } from './OrderedList'

export default {
    title: 'Molecules/OrderedList',
    component: OrderedList,
}

export const Default = () => {
    const [list, setList] = useState([
        {
            id: 1,
            title: 'Item 1',
            description: '9 Tickets 3 Users',
        },
        {
            id: 2,
            title: 'Item 2',
            description: '9 Tickets 3 Users',
        },
        {
            id: 3,
            title: 'Item 3',
            description: '9 Tickets 3 Users',
        },
    ])

    return <OrderedList list={list} setList={setList} title="Queue Title" />
}
