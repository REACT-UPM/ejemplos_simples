import React, { useState, useRef } from 'react';

export default function Examen() {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);
  let varCount = 0;

  const handleClick = () => {
    setCount(count + 1);
    refCount.current += 1;
    varCount += 1;
    console.log(`CONSOLA: Estado: ${count}, Ref: ${refCount.current}, Var: ${varCount}`);
  };

  return (
    <div>
      <p>PANTALLA: Estado: {count}, Ref: {refCount.current}, Var: {varCount}</p>
      <button onClick={handleClick}>Incrementar</button>
    </div>
  );
}

// Pregunta: Después de hacer clic en el botón "Incrementar" 3 veces, 
// ¿qué valores se mostrarán en la consola en la tercera impresión?

// a) CONSOLA: Estado: 3, Ref: 3, Var: 3
// b) CONSOLA: Estado: 3, Ref: 3, Var: 0
// c) CONSOLA: Estado: 3, Ref: 3, Var: 1
// d) CONSOLA: Estado: 2, Ref: 3, Var: 1 <== Correcta

// Pregunta: Después de hacer clic en el botón "Incrementar" 3 veces, 
// ¿qué valores se mostrarán en la pantalla en la tercera impresión?
// a) PANTALLA: Estado: 3, Ref: 3, Var: 0 <== Correcta
// b) PANTALLA: Estado: 3, Ref: 3, Var: 3
// c) PANTALLA: Estado: 3, Ref: 3, Var: 1
// d) PANTALLA: Estado: 2, Ref: 3, Var: 1 