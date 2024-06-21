import { useContext } from 'react';
import CardInfoContext from '../context/CardInfoContext';

function CardInfo() {
    // Information for the card selected
    const { cardInfo } = useContext(CardInfoContext);

    // console.log(cardInfo.attacks)

    return (
        <div>
            <h3>Card Information</h3>
            <ul style={{ textAlign: "left" }}>
                <li key={'id'} style={{ listStyleType: "none" }}>ID: {cardInfo.id}</li>
                <li key={'name'} style={{ listStyleType: "none" }}>Name: {cardInfo.name}</li>
                <li key={'rarity'} style={{ listStyleType: "none" }}>Rarity: {cardInfo.rarity}</li>
                <li key={'hp'} style={{ listStyleType: "none" }}>HP: {cardInfo.hp}</li>
                <li key={'moves'} style={{ listStyleType: "none" }}>Moves:
                    {cardInfo.attacks && cardInfo.attacks.map(data => (
                        <div>
                            - {`${data.name}: ${data.damage ? `(${data.damage})` : '(No DMG)'} ${data.effect ? ` - ${data.effect}` : ''}`}
                        </div>
                    ))}
                </li>
                <li key={'weakness'} style={{ listStyleType: "none" }}> {cardInfo.weaknesses && cardInfo.weaknesses.map(data => (
                    <div> Weaknesses: {data.type}{data.value}</div>
                ))}
                </li>
                <li key={'illus'} style={{ listStyleType: "none" }}>Illustrator: {cardInfo.illustrator}</li>
            </ul>
        </div>
    )
}

export default CardInfo