import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

export const EndingScreen = ({character, item, handleChoiceClick, setDialogueIndex}) => {

    const thanksMsg = <div className="thanks-msg">
    <p>¡Gracias por jugar!</p>
    </div>;

    const [screenImg, setScreenImg] = useState(item);
    const [message, setMessage] = useState(thanksMsg);

    const restartBtn = <div className="ending-btn-box"><Link className="link-home" to="/">
    <button onClick={handleClick} className="restart-btn">REINICIAR</button></Link>
    <button className="buy-other-btn" onClick={handleBuyOther}>Comprar otro objeto</button></div>

    setTimeout(() => {
        setMessage(restartBtn);
    }, 3000);        

    setTimeout(() => {
        setScreenImg(character);
    }, 1200);

    function handleClick(ev) {
      ev.preventDefault();
      handleChoiceClick(0)
      localStorage.clear();
    }

    function handleBuyOther(ev) {
      ev.preventDefault();
      handleChoiceClick(9);
      setDialogueIndex(17);
      localStorage.clear();
    }

  return (
    <>
        
      <div className="screen ending-screen" style={{ backgroundImage: `url(${screenImg})` }}>
      {message}
      </div>
      
  </>
  )
}

EndingScreen.propTypes = {
  character: PropTypes.string,
  item: PropTypes.string,
  handleChoiceClick: PropTypes.func,
  setDialogueIndex: PropTypes.func,
}