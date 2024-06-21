import { useContext } from 'react';
import CardInfoContext from '../context/CardInfoContext';

function CardInfo() {
    // Information for the card selected
    const {cardInfo} = useContext(CardInfoContext);

    return (
        <div>
            <h3>Card Information</h3>
            <ul style={{textAlign: "left"}}>
                <li id={cardInfo.id} style={{listStyleType: "none"}}>ID: {cardInfo.id}</li>
                <li id={cardInfo.name} style={{listStyleType: "none"}}>Name: {cardInfo.name}</li>
                <li id={cardInfo.rarity} style={{listStyleType: "none"}}>Rarity: {cardInfo.rarity}</li>
            </ul>
        </div>
    )
}

export default CardInfo