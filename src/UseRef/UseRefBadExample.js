import React, { useRef } from 'react';

export default function UseRefBadExample() {
  // useRef to store the reference to the div element
  const divRef = useRef(null);
  const inputRef = useRef(null);

  const changeBackgroundColor = () => {
    // Directly modifying the DOM element's style using ref
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'red';
    }
  };

  const updateInputValue = () => {
    // Directly setting the input value using ref
    if (inputRef.current) {
      inputRef.current.value = 'Directly Modified!';
    }
  };

  return (
    <div >
      <div ref={divRef} style={{ width: '200px', height: '100px', backgroundColor: 'lightblue' }}>
        I should change color
      </div>
      <button onClick={changeBackgroundColor}>Change Background Color</button><br/><br/><br/>
      <input ref={inputRef} type="text" placeholder="Type something here..." />
      <button onClick={updateInputValue}>Update Input Value</button>
    </div>
  );
}


/* this should be done like the following:
import React, { useState } from 'react';

function GoodExample() {
  const [backgroundColor, setBackgroundColor] = useState('lightblue');
  const [inputValue, setInputValue] = useState('');

  const changeBackgroundColor = () => {
    // Use state to manage the style change
    setBackgroundColor('red');
  };

  const updateInputValue = () => {
    // Use state to update the input value
    setInputValue('Directly Modified!');
  };

  return (
    <div>
      <div style={{ width: '200px', height: '100px', backgroundColor }} >
        I should change color
      </div>
      <button onClick={changeBackgroundColor}>Change Background Color</button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something here..."
      />
      <button onClick={updateInputValue}>Update Input Value</button>
    </div>
  );
}

export default GoodExample;
*/
