import PropTypes from "prop-types";

function ChoiceButton(props) {

    function handleClickChoice(ev) {
        ev.preventDefault();
        const id = ev.currentTarget.id;
        if (id === "choice1"){
            props.setCurrentScene(props.sceneChoice1)
            props.handleChoiceClick(props.scene1)
            
        } else if (id === "choice2") {
            props.setCurrentScene(props.sceneChoice2)
            props.handleChoiceClick(props.scene2)
        } else if (id === "choice3") {
            props.setCurrentScene(props.sceneChoice3)
            props.handleChoiceClick(props.scene3)
        }
    }

    return (
        <button id={props.id} className={`choice-btn ${props.id === "choice3" && props.scene3 === undefined ? "hidden" : "" }`} onClick={handleClickChoice}>{props.choiceText}</button>
    )
}

ChoiceButton.propTypes = {
    setCurrentScene: PropTypes.func,
    sceneChoice1: PropTypes.array,
    sceneChoice2: PropTypes.array,
    handleChoiceClick: PropTypes.func,
    choiceText1: PropTypes.string,
    choiceText2: PropTypes.string,
    id: PropTypes.string,
    choiceText: PropTypes.string,
    scene1: PropTypes.number,
    scene2: PropTypes.number,
    sceneChoice3: PropTypes.array,
    choiceText3: PropTypes.string,
    scene3: PropTypes.number
  };

export default ChoiceButton