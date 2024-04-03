import { useState, useEffect, useRef } from "react";

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import StatsBlock from "./components/StatsBlock";
import Filters from "./components/Filters";

const App = () => {
  const [cardsInfo, setCards] = useState({
    allCards: [],
    displayedCards: [],
  });
  // const [cardsInfo, setCards] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    cardType: 'All',
    power: 0,
    tough: 0,
  });

  const bubbleOptions = ["Any", "1", "2", "3", "4", "5+"];

  // original API call
  useEffect(() => {
    getNewCards().catch(console.error);
  }, [])

  // update if filter is updated
  useEffect(() => {
    const updateCardsDisplay = () => {
      // apply search filter
      let filterSearch = filter.search.length !== 0 ? 
        cardsInfo.allCards.filter((card) => 
        card.name.toLowerCase().indexOf(filter.search) !== -1) :
        cardsInfo.allCards;
  
      // apply type filter
      if (filter.cardType === "other") {
        filterSearch = filterSearch.filter((card) => 
          card.type.toLowerCase().indexOf("creature") === -1 &&
          card.type.toLowerCase().indexOf("sorcery") === -1 &&
          card.type.toLowerCase().indexOf("enchantment") === -1);
      } else if (filter.cardType !== "all") {
        filterSearch = filterSearch.filter((card) => card.type.toLowerCase().indexOf(filter.cardType) !== -1);
      }
        
      // apply power filter
      filterSearch = filter.power != 0 ? filterSearch.filter((card) => 
        card.power >= filter.power)
        : filterSearch;
        
      // apply toughness filter
      filterSearch = filter.tough != 0 ? filterSearch.filter((card) => 
        card.toughness >= filter.tough)
        : filterSearch;
      
      setCards((prevJson) => ({
        ...prevJson,
        displayedCards: [...filterSearch]
      }));
  
    }

    if (cardsInfo.displayedCards) updateCardsDisplay();

    
  }, [filter]);
  useEffect(() => {console.log(cardsInfo);} , [cardsInfo]);

  const getNewCards = async () => {
    const apiURL = "https://api.magicthegathering.io/v1/cards?pageSize=50&random=true";
    const response = await fetch(apiURL);
    const json = await response.json();
    const cards = json.cards;
    // update the cards json
    setCards({
      displayedCards: [...cards],
      allCards: [...cards],
    });
  }

  const calcCards = (type) => {
    let total = 0;
    if (cardsInfo.displayedCards) {
      for(let t = 0; t < cardsInfo.displayedCards.length; t++) {
        if (type === "other" &&
          cardsInfo.displayedCards[t].type.toLowerCase().indexOf("creature") === -1 &&
          cardsInfo.displayedCards[t].type.toLowerCase().indexOf("sorcery") === -1 &&
          cardsInfo.displayedCards[t].type.toLowerCase().indexOf("enchantment") === -1) total++;
        else if (cardsInfo.displayedCards[t].type.indexOf(type) != -1) total++;
      }
    }
    return total;
  }

  const handleFilterChange = (e) => {
    if (e.target.name === "selectType") {
      setFilter((prevState) => ({
        ...prevState,
        cardType: e.target.value,
      }));
    } else if (e.target.name === 'search') {
      setFilter((prevState) => ({
        ...prevState,
        search: e.target.value.trim().toLowerCase(),
      }));
    } else {
      // update the active index if a select filter was clicked
      const name = e.target.name;
      const start = name.indexOf("-") + 1;
      const end = name.indexOf("-", start);
      const type = name.substring(start, end);
      setFilter((prevState) => ({
        ...prevState,
        [type]: name.slice(-1),
      }));

    }
  }

  const refreshCards = () => {
    getNewCards();
    setFilter((prevState) => ({
      ...prevState,
      search: "",
      cardType: "All",
      power: 0,
      tough: 0
    }));
  }

  return (
    <>
      <Header 
        change={handleFilterChange}
        searchVal={filter.search}/>

      <div className="stats-container">
        <StatsBlock 
          type="Total Cards"
          info={cardsInfo.displayedCards ? cardsInfo.displayedCards.length : 0}/>
        <StatsBlock 
          type="Creatures"
          info={calcCards('Creature')}/>
        <StatsBlock 
          type="Sorceries"
          info={calcCards('Sorcery')}/>
        <StatsBlock 
          type="Enchantments"
          info={calcCards('Enchantment')}/>
        <StatsBlock 
          type="Other"
          info={calcCards('other')}/>
      </div>

      <Filters 
        handleChange = {handleFilterChange}
        filterVar = {filter}
        loadCards = {refreshCards}
        bubbleOptions = {bubbleOptions}/>

      <div className="data-body dash-elem">
        <Section 
          header="Name"
          content={cardsInfo.displayedCards ? cardsInfo.displayedCards.map((cards) => cards.name): null}
          keyInfo="name"/>
        <Section 
          header="Mana Cost"
          content={cardsInfo.displayedCards ? cardsInfo.displayedCards.map((cards) => cards.manaCost): null}
          keyInfo="mc"/>
        <Section 
          header="Type"
          content={cardsInfo.displayedCards ? cardsInfo.displayedCards.map((cards) => cards.type): null}
          keyInfo="type"/>
        <Section 
          header="Power"
          content={cardsInfo.displayedCards ? cardsInfo.displayedCards.map((cards) => cards.power): null}
          keyInfo="power"/>
        <Section 
          header="Toughness"
          content={cardsInfo.displayedCards ? cardsInfo.displayedCards.map((cards) => cards.toughness): null}
          keyInfo="tough"/>
      </div>
    </>
  );
}

export default App;