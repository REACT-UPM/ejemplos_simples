import React, { useState } from 'react';

export default function Contador() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 2)}>
        Click me
      </button>
    </div>
  );
}