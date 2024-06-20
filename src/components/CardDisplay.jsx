import { useState, useEffect } from 'react';

function CardDisplay(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <img src={props.img} alt={props.name} />
        </div>
    )
}

export default CardDisplay;