// https://www.greatfrontend.com/questions/user-interface/progress-bars

import React, {useState,useEffect} from 'react';

export default function App() {
  const [bars,setBars] = useState([]);
  const AddProgressBar = ()=>{
      setBars([...bars,{progress:0}]);
  }

  return (
    <div>
      <button onClick={AddProgressBar}>Add</button>
      <div>
         {bars.map(()=>(
          <ProgressBar />       
         ))}
      </div>
    </div>
  );
}


const ProgressBar = ()=>{
  const [progress,setProgress] = useState(0);

  useEffect(()=>{
   const interval = setInterval(()=>{
        setProgress((prev)=>(Math.min(prev+5,100)))
   },100)

   return ()=>clearInterval(interval);
  },[])
  
  return (
    <div className="progress-bar">
      <div style={{background:"green", width:`${progress}%`, height:"100%"}}>
        
      </div>
    </div>
  )

}
