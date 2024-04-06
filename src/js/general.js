// counts the number of cards that match a given value
export const calcCards = (cardsInfo, valToCount, attr) => {
  let total = 0;
  if (cardsInfo.displayedCards) {
    if (attr === 'type') {
      for(let t = 0; t < cardsInfo.displayedCards.length; t++) {
        if (valToCount === "other" &&
          cardsInfo.displayedCards[t].type.toLowerCase().indexOf("creature") === -1 &&
          cardsInfo.displayedCards[t].type.toLowerCase().indexOf("sorcery") === -1 &&
          cardsInfo.displayedCards[t].type.toLowerCase().indexOf("enchantment") === -1) total++;
        else if (cardsInfo.displayedCards[t].type.indexOf(valToCount) != -1) total++;
      }
    } else if (attr === 'power') {
      for(let c = 0; c < cardsInfo.displayedCards.length; c++) {
        if (valToCount == "N/A" && !cardsInfo.displayedCards[c].power) total++;
        else if (valToCount == "5+" && cardsInfo.displayedCards[c].power >= 5) total++;
        else if (cardsInfo.displayedCards[c].power == valToCount) total++;
      }
    } else if (attr === 'tough') {
      for(let c = 0; c < cardsInfo.displayedCards.length; c++) {
        if (valToCount == "N/A" && !cardsInfo.displayedCards[c].toughness) total++;
        else if (valToCount == "5+" && cardsInfo.displayedCards[c].toughness >= 5) total++;
        else if (cardsInfo.displayedCards[c].toughness == valToCount) total++;
      }
    } else {
      console.log(`attempted counting of an unsupported attribute: ${attr}`);
    }
  }
  return total;
}
// fetched new cards from the API
export const getNewCards = async (setCards) => {
  const apiURL = "https://api.magicthegathering.io/v1/cards?pageSize=50&random=true";
  const response = await fetch(apiURL);
  const json = await response.json();
  const cards = json.cards;
  // update the cards json
  setCards({
    displayedCards: [...cards],
    allCards: [...cards],
  });

  // update data viz data
};