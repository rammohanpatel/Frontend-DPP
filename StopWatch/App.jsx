// https://www.greatfrontend.com/questions/user-interface/stopwatch?language=js&tab=coding

import React,{useState,useEffect} from "react"

export default function Stopwatch() {

  const [start,setStart] = useState(false);
  const [time,setTime] = useState(0);


  useEffect(()=>{
    let interval;
    if(start){
      interval = setInterval(()=>{
        setTime((prev)=>(prev+10))
      },10)
    }

    return ()=>clearInterval(interval);
  },[start])


  const handleClick = ()=>{
    setStart((prev)=>(!prev));
  }

  const handleReset = ()=>{
    setStart(false);
    setTime(0);
  }

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Show two decimal places

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };


  return (
    <div>
      <p>{formatTime(time)}</p>
      <div>
        <button
          onClick={handleClick}
        >{start==true?'Stop':"Start"}</button>
         <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
