import React, { useRef } from 'react';

// Desde React 19, un componente de función puede recibir `ref` como una
// prop normal. Ya no hace falta envolverlo con forwardRef para poder
// pasarle una ref desde fuera: basta con leerla como cualquier otra prop
// y colocarla donde corresponda (aquí, en el <input> real).
function MyInput({ placeholder, ref }) {
  return <input ref={ref} type="text" placeholder={placeholder} />;
}

export default function UseRefAsProp() {
  // useRef to store the reference to the input element
  const inputRef = useRef(null);

  const focusInput = () => {
    // Access the current property of the ref to get the DOM element
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  return (
    <div>
      <MyInput ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

/* Antes de React 19, MyInput había que escribirlo con forwardRef, porque
   `ref` no llegaba como una prop más a la función:

import React, { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput({ placeholder }, ref) {
  return <input ref={ref} type="text" placeholder={placeholder} />;
});

export default MyInput;
*/
