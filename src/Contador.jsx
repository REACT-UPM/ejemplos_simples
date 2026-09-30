import { useState } from 'react';

export default function Contador() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  //también se podría declarar la función de esta manera
  //y después llamarla en el onClick del botón
  function incrementar(number) {
    console.log(count);
    setCount(count + number);
  }


  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={function() { setCount(count + 2); }}>
        Click me
      </button>
    </div>
  );
}