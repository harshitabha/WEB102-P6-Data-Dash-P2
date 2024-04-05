import { useState, useEffect } from "react";

import "./Home.css";
import Header from "../components/Header";
import Stats from "../components/Stats";
import Filters from "../components/Filters";
import DataCard from "../components/DataCard";
import DataVisualization from "../components/DataVisualization";

const Home = () => {
  const [cardsInfo, setCards] = useState({
    allCards: [],
    displayedCards: [],
  });
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

  const calcCards = (valToCount, attr) => {
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
    // reset all the filters
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
      {/* Actual content of the page */}
      <Header />

      <Stats 
        cardsInfo = {cardsInfo}
        calcCards = {calcCards}/>

      <Filters 
        handleChange = {handleFilterChange}
        filterVar = {filter}
        loadCards = {refreshCards}
        bubbleOptions = {bubbleOptions}/>

      <DataCard
          apiCards={cardsInfo.displayedCards}/>
      <div className="data-info">
        {/* <div className="viz-body">
            <DataVisualization 
                data = {[
                    {
                        val: "N/A",
                        power: calcCards("N/A", 'power'),
                        tough: calcCards("N/A", 'tough'),
                    },
                    {
                        val: "1",
                        power: calcCards(1, "power"),
                        tough: calcCards(1, 'tough'),
                    },
                    {
                        val: "2",
                        power: calcCards(2, "power"),
                        tough: calcCards(2, 'tough'),
                    },
                    {
                        val: "3",
                        power: calcCards(3, "power"),
                        tough: calcCards(3, 'tough'),
                    },
                    {
                        val: "4",
                        power: calcCards(4, "power"),
                        tough: calcCards(4, 'tough'),
                    },
                    {
                        val: "5+",
                        power: calcCards("5", "power"),
                        tough: calcCards("5", 'tough'),
                    },
                ]}/>
        </div> */}
      </div>
    </>
  );
}

export default Home;