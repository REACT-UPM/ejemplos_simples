import React, { useState } from 'react';

export default function Contador2() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [mostrar, setMostrar] = useState(true);

  function suma() {
    if(count===4){
      setMostrar(false);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      {mostrar ? <button onClick={() => suma()}>
        Click me
      </button> : <div>Ya se acabó</div>}
    </div>
  );
}