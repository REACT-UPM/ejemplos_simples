import React, { useState, useEffect } from 'react';

export default function Contador5() {
  const [count, setCount] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    console.log("Creamos intervalo!!!")
    const interval = setInterval(()=>{
      setTick(tick => tick+1);
    },1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    console.log("entra y count")
  }, [count]);

  return (<div>
      <div>¿Eres más rápido que un setInterval?</div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count => count + 1)}>
        Click me
      </button>
      <p>Han pasado {tick} ticks</p>
    </div>);
}
