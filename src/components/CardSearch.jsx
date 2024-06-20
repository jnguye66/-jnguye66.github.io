import { useState, useEffect } from "react";

import getCardList from '../functions/getCardData.js';

function CardSearch() {
    // Stores the entire card list api data
    const [cardList, setCardList] = useState([]);
    
    // useEffect to populate the Card List once at initial launch
    useEffect(() => {
        // Grab card list data from API
        getCardList()
            .then(result => setCardList(result));

        console.log(cardList);

        let list = document.getElementById('card-list');
        let count = 0;

        cardList.forEach((card) => {
            let opt = document.createElement('option');
            if (card.image !== undefined) {
                count++;
                opt.id = card.id;
                opt.value = `${count}: ${card.name} - ${card.id.toUpperCase()}`;
                opt.textContent = opt.value;
            }

            list.appendChild(opt);
        })
    }, [])

    return (
        <>
            <h2>Card List Display</h2>
            <div>
                <form>
                    <h2>Search a Card</h2>
                    <input id="searchbar" name="searchbar" list='card-list'/>
                    <datalist id='card-list'></datalist>
                    <input type="submit" id="search" name="search"/>
                </form>
            </div>
        </>
    )
}

export default CardSearch;