import { useState, useEffect } from "react";
import CardDisplay from './CardDisplay.jsx';
import getCardList from '../functions/getCardData.js';

function CardSearch() {
    // Stores the entire card list api data
    const [cardList, setCardList] = useState([]);

    const [name, setName] = useState('');

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

    function cardSubmit(e) {
        e.preventDefault();

        let input = document.getElementById('searchbar');
        let name = input.value;

        // display.setAttribute('name', name);

        console.log(name)
        setName(name);
    }

    return (
        <>
            <h2>Card List Display</h2>
            <div>
                <form>
                    <h2>Search a Card</h2>
                    <input id="searchbar" name="searchbar" list='card-list'/>
                    <datalist id='card-list'></datalist>
                    <input type="submit" id="search" name="search" onClick={cardSubmit}/>
                </form>
            </div>
            <CardDisplay name={name}/>
        </>
    )
}

export default CardSearch;