import { useReducer, useEffect } from 'react';

const initialState = {
    id: '',
    image: '',
    illustrator: '',
    rarity: '',
    set: {
        cardCount: {
            official: 0,
            total: 0
        },
        id: '',
        name: ''
    },
    hp: 0,
    types: [''],
}

// const reducer = (state, action) => {

// }

function CardInfo() {
    return (
        <div>CardInfo</div>
    )
}

export default CardInfo