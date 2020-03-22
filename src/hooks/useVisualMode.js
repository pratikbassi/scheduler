import { React, useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(state, replace = false) {
    if(!replace) {
      history.push(mode)
    }
    setMode(state)
  }
  const back = function() {
    if(history.length !== 0) {
      setMode(history.pop())
    }
  }


  return {
    mode,
    transition,
    back
    //setState:((data)=>{setMode(data)})
  }
}