import "../styles/App.scss"
// Components
import Game from "./Game";
import Welcome from "./Welcome";
// JSON
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
