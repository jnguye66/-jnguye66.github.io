export default function getCardList() {
    const url = 'https://api.tcgdex.net/v2/en/cards';

    return fetch(url)
    .then(data => data.json());
}