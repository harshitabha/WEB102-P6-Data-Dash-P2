import {Routes, Route} from "react-router-dom";
import {useState} from "react";

import Home from "./pages/Home";
import CardInfo from "./pages/CardInfo";

const App = () => {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/card-info/:id" element={<CardInfo />}/>
      </Routes>
    </>
  );
}

export default App;