import { useState, useEffect } from "react";

import "./Home.css";
import Stats from "../components/Stats";
import Filters from "../components/Filters";
import DataCard from "../components/DataCard";
import Header from "../components/Header";

import { getNewCards } from "../js/general.js";

const Home = ({cardsInfo, setCards, updateDataVizInfo}) => {
  const [filter, setFilter] = useState({
    search: '',
    cardType: 'All',
    power: 0,
    tough: 0,
  });

  const bubbleOptions = ["Any", "1", "2", "3", "4", "5+"];

  // update if filter is updated
  useEffect(() => {
    const updateCardsDisplay = () => {
      // apply search filter
      let filterSearch = filter.search.length !== 0 ? 
        cardsInfo.allCards.filter((card) => 
        card.name.toLowerCase().indexOf(filter.search) !== -1) :
        cardsInfo.allCards;
  
      // apply type filter
      if (filter.cardType.toLowerCase() === "other") {
        filterSearch = filterSearch.filter((card) => 
          card.type.toLowerCase().indexOf("creature") === -1 &&
          card.type.toLowerCase().indexOf("sorcery") === -1 &&
          card.type.toLowerCase().indexOf("enchantment") === -1);
      } else if (filter.cardType.toLowerCase() !== "all") {
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
    getNewCards(setCards).catch(console.error);
    // reset all the filters
    setFilter((prevState) => ({
      ...prevState,
      search: "",
      cardType: "All",
      power: 0,
      tough: 0
    }));

    updateDataVizInfo();
  }

  useEffect(() => {
    updateDataVizInfo();
  }, [cardsInfo.allCards]);
  return (
    <>
      {/* Actual content of the page */}
      <Header />

      <Stats 
        cardsInfo = {cardsInfo} />

      <Filters 
        handleChange = {handleFilterChange}
        filterVar = {filter}
        loadCards = {refreshCards}
        bubbleOptions = {bubbleOptions}/>

      <DataCard
          apiCards={cardsInfo.displayedCards}/>
    </>
  );
}

export default Home;