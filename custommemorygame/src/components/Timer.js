import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook';

function Timer({expiryTimestamp, gameIsRunning, gameTableArray, setGameTime, setWinnerMsgIsVisible, setLoserMsgIsVisible}) {

  const {
    seconds,
    minutes,
    pause,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => setLoserMsgIsVisible("flex") });

  useEffect(() => {
    if (gameIsRunning) {
      restart(expiryTimestamp)
    } else {
      pause()
    }
  }, [gameIsRunning])

  useEffect(() => {
    let pairs = gameTableArray.filter(gameCard => gameCard.success === true)
    if (pairs.length === gameTableArray.length) { 
      pause()
      setWinnerMsgIsVisible("flex")
    }
  }, [gameTableArray])

  useEffect(() => {
    setGameTime(minutes + ":" + seconds)
  }, [minutes, seconds])


  return (
    <div className='timerContainer'>
      <div className='timer'>
        <span className='timerMin'>{minutes}</span>:<span className='timerSec'>{seconds}</span>
      </div>
    </div>
  );
}

export default Timer