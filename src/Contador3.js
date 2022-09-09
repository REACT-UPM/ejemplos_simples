import React, { useState, useEffect } from 'react';

//mejora a contador1 en que el setCount usa el valor anterior
export default function Contador3() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count => count + 1)}>
        Click me
      </button>
    </div>
  );
}
