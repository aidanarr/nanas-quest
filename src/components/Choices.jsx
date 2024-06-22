import ChoiceButton from "./ChoiceButton";
import PropTypes from "prop-types";


function Choices(props) {

    return (
        <>
            <div className="choice-box">
                <ChoiceButton 
                     setCurrentScene={props.setCurrentScene} sceneChoice1={props.sceneChoice1} handleChoiceClick={props.handleChoiceClick} id="choice1" choiceText={props.choiceText1} scene1={props.scene1} 
                />

                <ChoiceButton 
                     setCurrentScene={props.setCurrentScene} sceneChoice2={props.sceneChoice2} handleChoiceClick={props.handleChoiceClick} id="choice2" choiceText={props.choiceText2} scene2={props.scene2}
                />

                <ChoiceButton 
                    setCurrentScene={props.setCurrentScene} sceneChoice3={props.sceneChoice3} handleChoiceClick={props.handleChoiceClick} id="choice3" choiceText={props.choiceText3} scene3={props.scene3}
                />

                {/* { props.scene3 ? 
                    <ChoiceButton 
                         setCurrentScene={props.setCurrentScene} sceneChoice3={props.sceneChoice3} handleChoiceClick={props.handleChoiceClick} id="choice3" choiceText={props.choiceText3} scene3={props.scene3}
                    />
                : false } */}
            </div>
            <div className="screen-choice"></div>
        </>
    )
}

Choices.propTypes = {
    setCurrentScene: PropTypes.func,
    sceneChoice1: PropTypes.array,
    sceneChoice2: PropTypes.array,
    handleChoiceClick: PropTypes.func,
    choiceText1: PropTypes.string,
    choiceText2: PropTypes.string,
    scene1: PropTypes.number,
    scene2: PropTypes.number,
    sceneChoice3: PropTypes.array,
    choiceText3: PropTypes.string,
    scene3: PropTypes.number
  };

export default Choices