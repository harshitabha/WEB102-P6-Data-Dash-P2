import {Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import CardInfo from "./pages/CardInfo";
import NotFound from "./pages/NotFound";
import DataViz from "./pages/DataViz";

import { getNewCards, calcCards } from "./js/general";

const App = () => {
  const [cards, setCards] = useState({
    allCards: [],
    displayedCards: [],
  });

  const [chartData, setChartData] = useState({
    barData: [],
    pieData: [],
  });

  // original API call
  useEffect(() => {
    getNewCards(setCards).catch(console.error);
  }, []);
  useEffect(() => {
    updateDataVizInfo();
  }, [cards]);

  const updateDataVizInfo = () => {
    // update the data for the data vizualization
    setChartData((prevData) => ({
      ...prevData,
      barData: [
          {
            name: "N/A",
            power: calcCards(cards, "N/A", 'power'),
            tough: calcCards(cards, "N/A", 'tough'),
          },
          {
            name: "1",
            power: calcCards(cards, 1, "power"),
            tough: calcCards(cards, 1, 'tough'),
          },
          {
            name: "2",
            power: calcCards(cards, 2, "power"),
            tough: calcCards(cards, 2, 'tough'),
          },
          {
            name: "3",
            power: calcCards(cards, 3, "power"),
            tough: calcCards(cards, 3, 'tough'),
          },
          {
            name: "4",
            power: calcCards(cards, 4, "power"),
            tough: calcCards(cards, 4, 'tough'),
          },
          {
            name: "5+",
            power: calcCards(cards, "5", "power"),
            tough: calcCards(cards, "5", 'tough'),
          },
      ],
      pieData: [
        {
          name: "Creatures",
          value: calcCards(cards, 'Creature', 'type')
        },
        {
          name: "Sorceries",
          value: calcCards(cards, 'Sorcery', 'type')
        },
        {
          name: "Enchantments",
          value: calcCards(cards, 'Enchantment', 'type')
        },
        {
          name: "Other",
          value: calcCards(cards, 'other', 'type')
        },
      ],
    }));
  };

  return (
    <> 
      <Routes>
        <Route 
          path="/" 
          element={<Home 
                      cardsInfo={cards} 
                      setCards={setCards}
                      updateDataVizInfo={updateDataVizInfo}/>} />
        <Route path="/card-info/:id" element={<CardInfo />}/>
        <Route path="/data-viz" element={<DataViz chartData={chartData}/>}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>

    </>
  );
}

export default App;