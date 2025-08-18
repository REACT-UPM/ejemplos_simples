import React, { useRef, useState } from 'react';


export default function UseRefUseStateVar() {
    console.log("Ponemos el valor de a en 0");
    let a = 0;
    console.log("Generamos un número aleatorio");
    let myrandom = Math.random();
    
    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);
  
    const incrementState = () => {
      console.log('stateCount:', stateCount);
      setStateCount(stateCount + 1);
    };
  
    const incrementVar = () => {
      console.log('Variable a:',a);
      a += 1;            
    }

    const incrementRef = () => {
      refCount.current += 1;      
      console.log('refCount:', refCount.current);
    }
  
    
  
    return (
      <div className="App" style={{textAlign: 'center'}}>
        <h2>Variable con let: {a}</h2>
        <h2>Random: {myrandom}</h2>
        <button onClick={incrementVar}>Incrementar Variable</button>
        <h2>Ref: {refCount.current}</h2>
        <button onClick={incrementRef}>Incrementar Ref</button>
        <h2>State: {stateCount}</h2>        
        <button onClick={incrementState}>Incrementar State</button>
      </div>
    );
  }
  