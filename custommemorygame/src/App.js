import { useState } from 'react'
import { readImgFile } from './util/fileReader'
import { shuffle } from './util/arrayShuffle'
import { getTime } from './util/getTime'
import { defaultImgArray } from './util/defaultImgArray'
import ImagePrevCard from './components/ImagePrevCard'
import GameTableCard from './components/GameTableCard'
import Timer from './components/Timer'
import addImg from './images/image-solid.svg'
import playImg from './images/circle-play-solid.svg'
import stopImg from './images/circle-stop-solid.svg'
import './App.css'

function App() {

  const [actualImageArray, setActualImageArray] = useState(defaultImgArray)
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const [btnTitle, setBtnTitle] = useState(playImg)

  const [gameTableArray, setGameTableArray] = useState([])
  const [penalty, setPenalty] = useState(false)

  const [turnedCardDeck, setTurnedCardDeck] = useState([])

  const [difficulty, setDifficulty] = useState(5)
  const [gameTime, setGameTime] = useState(0)
  const [winnerMsgIsVisible, setWinnerMsgIsVisible] = useState("none")
  const [loserMsgIsVisible, setLoserMsgIsVisible] = useState("none")

  const [warnMsg, setWarnMsg] = useState("")
  const [warnClass, setWarnClass] = useState("")

    const gameLogic = () => {
        let turnedCards = gameTableArray.filter(gameCard => gameCard.cardTurned === true)
        setTurnedCardDeck(turnedCards)
        if (turnedCards.length !== 0 && turnedCards.length % 2 === 0) {
          if (turnedCards[0].id === turnedCards[1].id) {
            let newArray = []
            gameTableArray.map(gameCard => {
              if (gameCard.id === turnedCards[0].id) {
                gameCard.success = true
                gameCard.cardTurned = false
              }
              newArray.push(gameCard)
            })
            setGameTableArray(newArray)
       
          } else {
            setPenalty(true)
            let newArray = []
            setTimeout(() => {
              gameTableArray.map(gameCard => {
                gameCard.cardTurned = false
                newArray.push(gameCard)
              })
              setGameTableArray(newArray)
              setPenalty(false)
            }, 1000);
          }
        } 
      }

    const gameSetup = () => {
      setWinnerMsgIsVisible("none")
      setLoserMsgIsVisible("none")
      if (actualImageArray.length >= 3) {
        if (gameIsRunning) { 
          setBtnTitle(playImg)
          setGameIsRunning(false)
        } else {
          setBtnTitle(stopImg)
          setGameIsRunning(true)
          let newArr = []
          let deepCopyArray = JSON.parse(JSON.stringify(shuffle(actualImageArray.concat(actualImageArray))))
          deepCopyArray.map((act, i) => {
            act.index = i
            newArr.push(act)
          })
          setGameTableArray(newArr)
        }
      } else {
        setWarnMsg(" ⚠  Please select at least 3 picture before Start New Game!")
                if (warnClass === "") {
                  setWarnClass("warning-msg")
                  setTimeout(() => {
                      setWarnMsg("")
                      setWarnClass("")
                  }, 5000);
                }
      }
    }

    const difficultHandler = (e) => {
      setDifficulty(parseInt(e.target.value))
    }

  return (
    <div className="App">
      <div className="warn-box"><p className={warnClass}>{warnMsg}</p></div>
      <div className="btnMenu">
        {!gameIsRunning &&
        <label>
        <input type='file' accept='image/*' multiple="multiple" onChange={(event) => readImgFile(event, actualImageArray, setActualImageArray)}/>
        <img className="fileInput" src={addImg} alt="addImg" title="Add picture"/>
        </label>}
        {!gameIsRunning && 
        <select className="diffSelect" title="Select difficulty" onChange={difficultHandler} defaultValue="5">
          <option value="10">Easy</option>
          <option value="5">Medium</option>
          <option value="3">Hard</option>
        </select>}
        {gameIsRunning && 
          <div>
            <Timer 
              expiryTimestamp={getTime(gameTableArray.length*difficulty)} 
              gameIsRunning={gameIsRunning} 
              gameTableArray={gameTableArray} 
              setGameTime={setGameTime}
              setWinnerMsgIsVisible={setWinnerMsgIsVisible}
              setLoserMsgIsVisible={setLoserMsgIsVisible}/>
          </div>}
        <img className="startGameBtn" title="Start Game" src={btnTitle} onClick={gameSetup}/>
      </div>
      <div className="gameStation">
      {!gameIsRunning 
        ? <div className="imagePrevContainer"> 
            {actualImageArray.map((actualImage, i) => 
                <ImagePrevCard 
                  key={i} 
                  actualImage={actualImage} 
                  actualImageArray={actualImageArray} 
                  setActualImageArray={setActualImageArray}/>)} 
          </div>
        : <div className="gameTableContainer"> 
            {gameTableArray.map((actualImage, i) =>
                <GameTableCard 
                  key={i} 
                  actualImage={actualImage} 
                  gameTableArray={gameTableArray} 
                  setGameTableArray={setGameTableArray} 
                  gameLogic={gameLogic} penalty={penalty} 
                  setPenalty={setPenalty}
                  turnedCardDeck={turnedCardDeck}/>)}
          </div>}
      </div>
      <div className="winnerMsg" style={{display: winnerMsgIsVisible}}>
          <p>Good Job !!!</p>
          <p>Your remaining time is: {gameTime}</p>
          <button onClick={gameSetup}>New Game</button>
      </div>
      <div className="loserMsg" style={{display: loserMsgIsVisible}}>
          <p>Better luck next time!</p>
          <button onClick={gameSetup}>New Game</button>
      </div>
    </div>
  )
}

export default App
