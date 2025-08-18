import { useState } from 'react';

// Define the custom hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Function to toggle the value between true and false
  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  // Return the current value and the toggle function
  return [value, toggle];
}

export default useToggle;
