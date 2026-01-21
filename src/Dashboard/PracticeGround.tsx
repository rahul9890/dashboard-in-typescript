import React, { useEffect, useState } from "react";

function Groupchat(){

  const[count,setCount]=useState(0);
  const[start,setStart]=useState(false);

  useEffect(()=>{
    if(start){
        setInterval(()=>{
      setCount(count+1)
    },1000);
    
    }
    return ()=>clearInterval(count)
  },[count,start])

  return(<div>
    Count:{count} <br/>
    <button onClick={()=>setStart(true)}>Start</button>
    <button onClick={()=>setStart(false)}>Pause</button>
  </div>)
}

export default Groupchat;