import welcomeScreen from "../images/nanas-quest.png"
import welcomeOverlay from "../images/nanas-quest_whiteoverlay.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Welcome = () => {

  const [screenImg, setScreenImg] = useState(welcomeScreen);
  

  useEffect(() => {

    setTimeout(() => {
      setScreenImg(welcomeOverlay);
    }, 1500);

  },[])


  return (
    <>
      <div className="page"> 
        <div className="screen welcome-screen" style={{ backgroundImage: `url(${screenImg})` }}>
            <Link className="link" to="/game">
                <button className="start-btn">JUGAR</button>
            </Link>
        </div>
      </div>
    </>
  )
}

export default Welcome