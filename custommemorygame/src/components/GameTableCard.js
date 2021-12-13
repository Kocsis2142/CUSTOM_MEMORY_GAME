import defaultImage from '../images/defaultImage.png'
import { useState, useEffect } from 'react'

export default function GameTableCard({actualImage, gameTableArray, setGameTableArray, gameLogic, penalty, turnedCardDeck}) {

    const [act, setAct] = useState('')
    const [cardPrev, setCardPrev] = useState(defaultImage)
    const [cursor, setCursor] = useState('pointer')

    useEffect(() => {
        penalty ? setCursor('unset') : setCursor('pointer')
    }, [penalty])

    useEffect(() => {
        setTimeout(() => {
            if (!actualImage.success && turnedCardDeck.length > 1 && penalty) {
            setAct('')
            setCardPrev(defaultImage)
            }
        }, 1000);
    }, [turnedCardDeck])
    
    const turnCardHandler = () => {
        if (!penalty) setAct('gameCard')
        if (!penalty) {
            setTimeout(() => {
                setCardPrev(actualImage.imageFile)
            }, 250);
            let newArray = []
                gameTableArray.map(gameCard => {
                    if (gameCard.index === actualImage.index) gameCard.cardTurned = true
                    newArray.push(gameCard)
                })
                    setGameTableArray(newArray)
                    gameLogic()
        }
    }

    return (
        <div className="gameTable">
            {!actualImage.success
                ?
                    <div onClick={turnCardHandler} onDragStart={(e) => e.preventDefault()}>
                        { actualImage.cardTurned 
                        ? <img className={act} src={cardPrev} alt="gameCard"/>
                        : <img className={act} src={cardPrev} alt="defaultCard" style={{cursor: cursor}}/> }
                    </div>
                :
                    <div>
                        <img className={act} src={cardPrev} alt="gameCard"/>
                    </div>
            }
        </div>
          
    )
}
