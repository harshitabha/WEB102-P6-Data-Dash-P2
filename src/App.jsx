import {Routes, Route, Outlet} from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import CardInfo from "./pages/CardInfo";
import NotFound from "./pages/NotFound";

const App = () => {
  const [cards, setCards] = useState({
    allCards: [],
    displayedCards: [],
  });

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
  };

  // original API call
  useEffect(() => {
    getNewCards().catch(console.error);
  }, []);

  return (
    <> 
      <Routes>
        <Route path="/" element={<Home cardsInfo={cards} setCards={setCards} getNewCards={getNewCards}/>} />
        <Route path="/card-info/:id" element={<CardInfo />}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>

      <Header />
      <Outlet />
    </>
  );
}

export default App;