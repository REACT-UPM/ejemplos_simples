import React, { useRef } from 'react';

export default function UseRefInputFocus() {
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
      <input type="text" ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
