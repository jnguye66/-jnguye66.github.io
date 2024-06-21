import { useState, useEffect, useReducer } from "react";

import CardDisplay from './CardDisplay.jsx';
import getCardList from '../functions/getCardData.js';
import CardInfo from "./CardInfo.jsx";

import CardContext from "../context/CardContext.js";

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return [...state, action.data];

        case "delete":
            return state.slice(0, -1);

        default:
            return state;
    }
}

function CardSearch() {
    // useState to store the entire card list api data
    const [cardList, setCardList] = useState([]);
    // useState to store the users selected card
    const [card, setCard] = useState({});

    const [state, dispatch] = useReducer(reducer, []);

    // useEffect to populate the Card List once at initial launch
    useEffect(() => {
        // Grab card list data from API
        getCardList()
            .then(result => setCardList(result));

        console.log(cardList);

        let list = document.getElementById('card-list');

        cardList.forEach((card) => {
            let opt = document.createElement('option');
            if (card.image !== undefined) {
                opt.id = card.id;
                opt.value = `${card.name} - ${card.id.toUpperCase()}`;
                opt.textContent = opt.value;
            }

            list.appendChild(opt);
        })
    }, []);

    // onClick function to give CardDisplay information 
    function cardSubmit(e) {
        e.preventDefault();

        let input = document.getElementById('searchbar');
        let cardName = input.value;

        let cardImg = '';
        let cardID = '';

        cardList.forEach((card) => {
            if (cardName === `${card.name} - ${card.id.toUpperCase()}`) {
                cardID = card.id;
                cardImg = `${card.image}/high.png`;
            }
        });

        setCard({
            id: cardID,
            name: cardName,
            img: cardImg
        });
    }

    return (
        <CardContext.Provider value={{ card }}>
            <h2>Card Search</h2>
            <div>
                <form>
                    <input id="searchbar" name="searchbar" list='card-list' />
                    <datalist id='card-list'></datalist>
                    <input type="submit" id="search" name="search" onClick={cardSubmit} />
                </form>
            </div>
            <hr />
            <CardDisplay />
            <button id="nextBtn" onClick={() => dispatch({ type: 'add', data: card.name })}>Add to Deck</button>
            <CardInfo />
            <hr />
            <h3>Desk List</h3>

            {JSON.stringify(state)}

            <button id="removeBtn" onClick={() => dispatch({ type: 'delete' })}>Delete Card</button>
        </CardContext.Provider>
    )
}

export default CardSearch;