import { useState, useEffect } from "react";
import CardDisplay from './CardDisplay.jsx';
import getCardList from '../functions/getCardData.js';

function CardSearch() {
    // useState to store the entire card list api data
    const [cardList, setCardList] = useState([]);

    // useState to store the users selected card
    const [card, setCard] = useState({});

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
        let cardName = input.value;

        let cardImg = '';

        cardList.forEach((card) => {
            if (cardName === `${card.name} - ${card.id.toUpperCase()}`){
                cardImg = `${card.image}/high.png`;
            }
        })

        setCard({
            name: cardName,
            img: cardImg
        });
    }

    return (
        <>
            <h2>Card Search</h2>
            <div>
                <form>
                    <input id="searchbar" name="searchbar" list='card-list'/>
                    <datalist id='card-list'></datalist>
                    <input type="submit" id="search" name="search" onClick={cardSubmit}/>
                </form>
            </div>
            <hr />
            <CardDisplay name={card.name} img={card.img}/>
        </>
    )
}

export default CardSearch;