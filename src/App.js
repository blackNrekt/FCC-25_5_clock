import './App.css';
import React, { useState, useRef } from 'react';
import useTimer from './useTimer';

function App() {



  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);  
  const [playSound, setPlaySound] = useState(true);
  const beepAudioRef = useRef(null);
  
  const handleToggleSound = () => {
    setPlaySound(!playSound);
  };

  const {
    minutes,
    seconds,
    isBreak,
    isRunning,
    startStopTimer,
    resetTimer
  } = useTimer(breakTime, sessionTime, beepAudioRef, playSound, setSessionTime,setBreakTime);
  

  const timerMinutes = minutes<10? `0${minutes}` : minutes;
  const timerSeconds = seconds<10? `0${seconds}` : seconds;

  
  const changeTime = (amount, type) => {
    if (isRunning) {
      return;
    }
    if (type === "session") {
      const newSessionTime = sessionTime + amount;
      if (newSessionTime >= 1 && newSessionTime <= 60) {
        setSessionTime(newSessionTime);
      }
    } else if (type === "break") {
      const newBreakTime = breakTime + amount;
      if (newBreakTime >= 1 && newBreakTime <= 60) {
        setBreakTime(newBreakTime);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>25+5 Clock</h1>
      <div className='set-container'>
        <div className='break-container'>
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className='time-set'>
              <button className='btn-medium  #e3f2fd blue lighten-5'
                      id="break-decrement"
                      onClick={() => changeTime(-1,'break')}>            
                <i className='material-icons'>arrow_downward</i>
              </button>
              <h3 id="break-length">{breakTime}</h3>
              <button className='btn-medium  #e3f2fd blue lighten-5'
                      id="break-increment"
                      onClick={() => changeTime(1,'break')}>            
                <i className='material-icons'>arrow_upward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='session-container'>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div className='time-set'>
              <button className='btn-medium  #e3f2fd blue lighten-5'
                      id="session-decrement"
                      onClick={() => changeTime(-1,'session')}>            
                <i className='material-icons'>arrow_downward</i>
              </button>
              <h3 id="session-length">{sessionTime}</h3>
              <button className='btn-medium  #e3f2fd blue lighten-5'
                      id="session-increment"
                      onClick={() => changeTime(1,'session')}>            
                <i className='material-icons'>arrow_upward</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='timer-container'>
        <h3 id="timer-label">Session</h3>
        <h1 id="time-left"> {timerMinutes}:{timerSeconds}</h1>
        <div className='timer-buttons'>
          <button className='btn-medium  #e3f2fd blue lighten-5' onClick={()=>startStopTimer()} id="start_stop">
            {!isRunning?
              (<i className='material-icons'>play_circle_outline</i>)
            : 
              (<i className='material-icons'>pause_circle_outline</i>)
            }
          </button>
          <button className='btn-medium  #e3f2fd blue lighten-5' onClick={()=>resetTimer()} id="reset">
            <i className='material-icons'>replay</i>
          </button>
          <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ref={beepAudioRef}></audio>
          <button className='btn-medium  #e3f2fd blue lighten-5' onClick={()=> handleToggleSound()} id="onOffSound">
            {!playSound?
              (<i className='material-icons'>volume_off</i>)
            :
              (<i className='material-icons'>volume_up</i>)
            }  
              </button>
        </div>
      </div>      
    </div>  
  );    
}

export default App;

