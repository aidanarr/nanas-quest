import "../styles/App.scss"
import { useState, useEffect } from 'react';
// Components
import TextTyper from "./TextTyper";
import Choices from "./Choices";
import Game from "./Game";
import Welcome from "./Welcome";
// JSON
import script from "../services/script.json"
import { Route, Routes } from "react-router-dom";



function App() {



  return (
      <>
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </>

  )
}

export default App
