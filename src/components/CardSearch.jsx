import { useState, useEffect } from "react";

function CardSearch() {
    const [cardList, setCardList] = useState([])

    // useEffect to populate the Card List once at initial launch
    useEffect(() => {
        const url = 'https://api.tcgdex.net/v2/en/cards';
        

        fetch(url)
            .then(data => data.json())
            .then(result => setCardList(result));

        console.log(cardList);

        let list = document.getElementById('card-list');
        let count = 0;

        cardList.forEach((card) => {
            let opt = document.createElement('option');
            count++;
            if (card.image !== undefined) {
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