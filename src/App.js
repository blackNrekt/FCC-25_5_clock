import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



function App() {

  const [displayTime, setDisplayTime] = useState(25*60);
  const [breakTime, setbreakTime] = useState(5*60);
  
  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
      (minutes<10? "0"+ minutes : minutes) + ":" +(seconds<10? "0"+seconds : seconds)
    );
  };

  const changeTime = (amount,type) => {
    if (type==='break') {
      setbreakTime((prev) => prev+amount);
    }
  };


  return (
    <div>
      <ChangeLength 
        title={"Break Length"}
        changeTime={changeTime}
        type={"break"}
        time={breakTime}
        formatTime={formatTime}
      />
      <h1>{formatTime(displayTime)}</h1>
    </div>  
  );    
}

export default App;

