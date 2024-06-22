import { useState, useEffect } from 'react';
// Components
import TextTyper from "./TextTyper";
import Choices from "./Choices";
import { EndingScreen } from './EndingScreen';
// JSON
import script from "../services/script.json"
// Images
import enya from "../images/end/enya.png"
import simon from "../images/end/simon.png"
import abel from "../images/end/abel.png"
import planner from "../images/end/planner.png"
import book from "../images/end/book.png"
import vinyl from "../images/end/vinyl.png"

function Game() {



  const [sceneId, setSceneId] = useState("");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [preventClick, setPreventClick] = useState(false);
  // scene info
  const [currentScene, setCurrentScene] = useState(script[sceneIndex].scene[dialogueIndex]);

  // local storage
  useEffect(() => {
    if (currentScene.id !== "script-start") {
      localStorage.setItem("scene-index", JSON.stringify(sceneIndex));
      localStorage.setItem("dialogue-index", JSON.stringify(dialogueIndex));
    }
    
  }, [dialogueIndex, sceneIndex])


   // set local indexes if any
   useEffect(() => {

    const localIndex = parseInt(localStorage.getItem("scene-index"));
    const localDialogueIndex = parseInt(localStorage.getItem("dialogue-index"));
    
    if (localDialogueIndex || localIndex) {
      setSceneIndex(localIndex)
      setDialogueIndex(localDialogueIndex);
      setCurrentScene(script[localIndex].scene[localDialogueIndex])
    } else false
    
  }, [])

  // set scene and dialogue with each index update
  useEffect(() => {
    if (dialogueIndex < script[sceneIndex].scene.length) {
      setCurrentScene(script[sceneIndex].scene[dialogueIndex]);
    }
  }, [dialogueIndex, sceneIndex]);

  // saves enya or abel in sceneId when their scenes are reached
  useEffect(() => {
    if (script[sceneIndex].sceneId.includes("abel") || script[sceneIndex].sceneId.includes("enya")) {
      setSceneId([...sceneId, script[sceneIndex].sceneId])
    }
  }, [sceneIndex]);
  
// resets sceneId array when buy scene is reached
  useEffect(() => {
    if (script[sceneIndex].sceneId === "buy") {
      setSceneId([])
    }
  }, [sceneIndex]);

  // HANDLE CLICK
  function handleClick() {
    
    const nextSceneIndex = script[sceneIndex].nextScene;
    //check if preventClick is true
    if (preventClick) {
      return false 
    } else {
        // update dialogue index with each click
      if (dialogueIndex < script[sceneIndex].scene.length - 1) {
        setDialogueIndex(dialogueIndex + 1);
      } else if (sceneId.includes("enya") && sceneId.includes("abel")) {
        // if both enya and abel scenes were reached, jump to the next scene
        setSceneIndex(nextSceneIndex);
        setDialogueIndex(0); 
      } else if (script[sceneIndex].scene[dialogueIndex].id.includes("choices") || currentScene.id.includes("end")) {
        // if there's choices to render, update dialogueIndex
        setDialogueIndex(dialogueIndex + 1);
      } else {
        // scene end is reached
        if (nextSceneIndex !== null) {
          // go to next scene
          setSceneIndex(nextSceneIndex);
          // restart dialogue
          setDialogueIndex(0); 
        }
      }
    }
  }

  // Set scene index and reset dialogue index at the beginning of each scene
  function handleChoiceClick(scene) {
    setSceneIndex(scene);
    setDialogueIndex(0);
  }

  // Render chioce buttons based on current scene and dialogue id
  function renderChoices() {
    
    if (dialogueIndex === script[sceneIndex].scene.length) {
      // object with button info
      const sceneChoices = {
        // name must be the same as last dialogue id
        "simon-choices-1": {
          text1: "\"Me tengo que ir\"",
          text2: "\"Te ayudo a buscarla\"",
          choice1: script[2].scene, //go to next scene (choice 1) 
          choice2: script[3].scene,  //go to next scene (choice 2)
          scene1: 2,
          scene2: 3
        }, "simon-choices-2": {
          text1: "Ir a la cafetería",
          text2: "Ir a la librería",
          // checks if the scene "abel" was already reached, else renders it
          choice1: sceneId.includes("abel") ? script[7].scene : script[4].scene, 
          // checks if the scene "enya" was already reached, else renders it
          choice2: sceneId.includes("enya") ? script[8].scene : script[5].scene,
          scene1: sceneId.includes("abel") ? 7 : 4,
          scene2: sceneId.includes("enya") ? 8 : 5
        }, "abel-choices": {
          text1: "Volver al parque",
          text2: "Ir a la librería",
          choice1: script[6].scene, 
          choice2: script[5].scene,
          scene1: 6,
          scene2: 5
        }, "enya-choices": {
          text1: "Volver al parque",
          text2: "Ir a la cafetería",
          choice1: script[6].scene, 
          choice2: script[4].scene,
          scene1: 6,
          scene2: 4
        }, "buy-choices": {
          text1: "Comprar la agenda",
          text2: "Comprar el libro",
          text3: "Comprar el vinilo",
          choice1: script[10].scene, 
          choice2: script[11].scene,
          choice3: script[12].scene,
          scene1: 10,
          scene2: 11,
          scene3: 12
        },
        // choices finish here
      };

      if (sceneChoices[currentScene.id]) {
        // gets object elements from sceneChoices whose name matches with currentScene.id
        const { text1, text2, choice1, choice2, scene1, scene2, text3, choice3, scene3 } = sceneChoices[currentScene.id];
        return (
          <Choices
            scene1={scene1}
            scene2={scene2}
            setCurrentScene={setCurrentScene}
            sceneChoice1={choice1}
            sceneChoice2={choice2}
            handleChoiceClick={handleChoiceClick}
            choiceText1={text1}
            choiceText2={text2}
            //the last choice screen has 3 options
            scene3={scene3}
            sceneChoice3={choice3}
            choiceText3={text3}
          />
        );
      }

      const endingChoices = {
        "simon-end": {
          item: planner,
          character: simon,
        }, 
        "enya-end": {
          item: book,
          character: enya,
        }, 
        "abel-end": {
          item: vinyl,
          character: abel,
        }   
      };
  
      if (currentScene.id.includes("end"))  {
        const {item, character} = endingChoices[currentScene.id];
  
        return <EndingScreen handleChoiceClick={handleChoiceClick} item={item} character={character} />
      }

    } else return null;
  }

  
  // name box color
  function renderNameColor() {
    const name = currentScene.name
    if (name === "Simon") {
      return "name-simon"
    } else if (name === "Lala") {
      return "name-lala"
    } else if (name === "Enya") {
      return "name-enya"
    } else if (name === "Abel") {
      return "name-abel"
    } else if (name === "???") {
      return "name-unknown"
    }
  }

  // Render text speed
  function renderTextSpeed() {
    try {
      return script[sceneIndex].scene[dialogueIndex].textSpeed
    } catch (e) {
      return 20;
    }
  }

  // Restart btn
  function handleRestart(ev) {
    ev.preventDefault();
    handleChoiceClick(0);
    setCurrentScene(script[0].scene[0]);
    localStorage.clear();
  }

  return (
    <>
      <div className="page">
        {/* deploy: change img routes from ./src/images/ to /nanas-quest/assets/ */}
        {renderChoices()}
        <div className="screen" onClick={handleClick} style={{ backgroundImage: `url(/nanas-quest/assets/bg-${script[sceneIndex].sceneBg}.png)` }}>
          <div className="textbox">
            <TextTyper setPreventClick={setPreventClick} preventClick={preventClick} text={currentScene.dialogue} interval={renderTextSpeed()} />
            <div className={`name ${renderNameColor()}`}>
              <p>{currentScene.name}</p>
            </div>
          </div>
          <div style={{ backgroundImage: `url(/nanas-quest/assets/nana-${currentScene.nanaPic}.png)` }} className="sprite2"></div>
          <div style={{ backgroundImage: `url(/nanas-quest/assets/${currentScene.charaPic}.png)` }} className="sprite"></div>
          <p className="wip-text">Demo - proyecto en construcción</p>
        </div>
        <div className="screen-legend">
          <div className="screen-legend-box">
            <p className="credits">Creado por Aida Narros
              <span className="credits__bullet">•</span>
              <a href="https://github.com/aidanarr/nanas-quest" className="check-code" target="_blank">Ver el código</a>
            </p>
            <button onClick={handleRestart} className="restart-btn-main">Reiniciar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Game
