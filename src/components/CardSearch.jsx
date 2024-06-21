import { useState, useEffect, useReducer } from "react";

import CardDisplay from './CardDisplay.jsx';
import getCardList from '../functions/getCardData.js';
import CardInfo from "./CardInfo.jsx";

import CardContext from "../context/CardContext.js";
import CardInfoContext from "../context/CardInfoContext.js";

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return [...state, action.data];

        case "delete":
            return state.slice(0, -1);

        case "save":
            // Array of card objects the user wants to save
            let newData = state;

            // Set localStorage to updated oldData
            localStorage.setItem('cards', JSON.stringify(newData));
            return;

        case "load":
            // Grab localStorage data
            let oldData = localStorage.getItem('cards');
            // Convert to JSON
            let objData = JSON.parse(oldData);
            // console.log(oldData)

            let deckList = document.getElementById('deck-list');

            if(deckList.children.length !== objData.length){
                objData.forEach((card) => {
                    let li = document.createElement('li');
                    li.setAttribute('key', card.id);
                    li.innerHTML = card.name;
    
                    deckList.appendChild(li);
                })
            }
            return;

        default:
            return state;
    }
}

function CardSearch() {
    // useState to store the entire card list api data
    const [cardList, setCardList] = useState([]);
    // useState to store the information for an individual card
    const [cardInfo, setCardInfo] = useState({});
    // useState to store the users selected card
    const [card, setCard] = useState({});

    const [state, dispatch] = useReducer(reducer, []);

    // useEffect to populate the Card List once at initial launch
    useEffect(() => {
        // Grab card list data from API
        getCardList()
            .then(result => setCardList(result));

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

    function updateInfo(id){
        const url = `https://api.tcgdex.net/v2/en/cards/${id}`;

        fetch(url)
            .then(data => data.json())
            .then(result => setCardInfo(result));

        let data = JSON.stringify(cardInfo);
        let obj = JSON.parse(data);

        setCardInfo({
            id: obj.id,
            name: obj.name,
            rarity: obj.rarity,
        })
    }

    // onClick function to give CardDisplay information 
    function cardSubmit(e) {
        e.preventDefault();

        let input = document.getElementById('searchbar');
        let cardName = input.value;

        let cardImg = '';
        let cardID = '';


        cardList.forEach((card) => {
            if (cardName === `${card.name} - ${card.id.toUpperCase()}`) {
                updateInfo(card.id);
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
            <button id="nextBtn" onClick={() => {dispatch({ type: 'add', data: { id: card.id, name: card.name } });}}>Add to Deck</button>
            <CardInfoContext.Provider value={{cardInfo}}>
                <CardInfo />
            </CardInfoContext.Provider>
            <hr />
            <h3>Deck List</h3>

            <ul id="deck-list">
                {state?.map(card =>
                    <li key={card.id}>{card.name}</li>
                )}
            </ul>

            <button id="removeBtn" onClick={() => dispatch({ type: 'delete' })}>Delete Card</button>

            <button id="saveBtn" onClick={() => dispatch({ type: 'save' })}>Save Deck</button>

            <button id="loadBtn" onClick={() => dispatch({ type: 'load' })}>Load Deck</button>
        </CardContext.Provider>
    )
}

export default CardSearch;