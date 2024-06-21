import { useContext } from 'react';
import CardContext from '../context/CardContext';

import '../styles/CardDisplay.css';

function CardDisplay() {
    const {card} = useContext(CardContext);
    
    return (
        <div id='card-display'>
            <h3>{card.name}</h3>
            <img src={card.img} alt={card.name} />
        </div>
    )
}

export default CardDisplay;