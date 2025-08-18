import React, { useRef, useState } from 'react';

export default function UseRefMeasureDiv() {
  const [width, setWidth] = useState(0);
  // useRef to store the reference to the div element
  const divRef = useRef(null);

  const measureWidth = () => {
    // Access the current property of the ref to get the DOM element
    if (divRef.current) {
      // Measure the width of the div using getBoundingClientRect
      setWidth(divRef.current.getBoundingClientRect().width);
    }
  };

  return (
    <div>
      <div 
        ref={divRef} 
        style={{ width: '50%', padding: '20px', backgroundColor: 'lightblue', margin: '10px 0' }}
      >
        Resize the browser window and click the button to measure my width!
      </div>
      <button onClick={measureWidth}>Measure Width</button>
      <p>Measured Width: {width}px</p>
    </div>
  );
}
