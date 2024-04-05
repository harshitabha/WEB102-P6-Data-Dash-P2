import {Routes, Route} from "react-router-dom";
import {useState} from "react";

import Home from "./pages/Home";
import CardInfo from "./pages/CardInfo";

const App = () => {
  const [cards, setCards] = useState({
    allCards: [],
    displayedCards: [],
  });

  return (
    <> 
      <Routes>
        <Route path="/" element={<Home cardsInfo={cards} setCards={setCards}/>} />
        <Route path="/card-info/:id" element={<CardInfo  cardsInfo={cards}/>}/>
      </Routes>
    </>
  );
}

export default App;