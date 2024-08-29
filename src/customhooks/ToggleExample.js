import React from 'react';
import useToggle from './useToggle'; // Import the custom hook

function ToggleExample() {
  // Use the custom hook, with initial value set to false
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Text
      </button>
      {isVisible && <p>This text is toggled on and off.</p>}
    </div>
  );
}

export default ToggleExample;
