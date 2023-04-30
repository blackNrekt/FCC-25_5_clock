import { useState, useEffect} from 'react';

const useTimer = (breakTime, sessionTime, beepAudioRef, playSound, setSessionTime,setBreakTime) => {
    const [minutes, setMinutes] = useState(sessionTime);
    const [seconds, setSeconds] = useState(0);
    const [isBreak, setIsBreak] = useState(false); 
    const [isRunning, setIsRunning] = useState(false);

    const startStopTimer = () => setIsRunning(!isRunning);    
    const resetTimer = () => {                
        setIsRunning(false);
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
        setSessionTime(25);
        setBreakTime(5);
        document.getElementById("timer-label").innerHTML = "Session";
        beepAudioRef.current.pause();
        beepAudioRef.current.currentTime = 0;
    }

    useEffect(() => {
        if(isRunning) {
            if (isBreak) {
                document.getElementById("timer-label").innerHTML = "Break";
              } else {
                document.getElementById("timer-label").innerHTML = "Session";
              }               
            let interval = setInterval(() => {   
                if (seconds===0) {
                    if (minutes!==0) {
                        setSeconds(59);
                        setMinutes(minutes-1);
                    } else {                                                
                        let minutes = !isBreak? breakTime : sessionTime;
                        let seconds = 59;
                        setMinutes(minutes);
                        setSeconds(seconds);                     
                        setIsBreak(!isBreak);
                        
                    }
                } else {
                    setSeconds(seconds-1);
                }
            }, 1000);
            return () => clearInterval(interval);

        }
    }, [breakTime, sessionTime, seconds, isRunning]);

    useEffect(()=> {
        setMinutes(sessionTime);
    }, [sessionTime]);

    useEffect(() => {
        if (minutes==0 && seconds==0 && isRunning && playSound) {
            beepAudioRef.current.play();
        }
    },[minutes, seconds, isRunning, beepAudioRef, playSound]);

    return {minutes, seconds, isBreak, isRunning, startStopTimer, resetTimer};
}

export default useTimer;