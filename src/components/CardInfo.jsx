import { useContext } from 'react';
import CardContext from '../context/CardContext';



function CardInfo() {
    const {card} = useContext(CardContext);

    return (
        <div>
            <h3>Card Information</h3>
            
        </div>
    )
}

export default CardInfo