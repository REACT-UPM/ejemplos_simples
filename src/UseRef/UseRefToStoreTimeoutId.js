import React, { useState, useRef } from 'react';

export default function UseRefToStoreTimeoutId() {
    const [count, setCount] = useState(0);
    // useRef to store the interval ID
    const intervalRef = useRef(null);

    // Regular variable to store the interval ID - WARNING JUST FOR TESTING - IT DOES NOT WORK
    //console.log("Ponemos el valor de intervalId en null");
    //let intervalId = null;
  
    const startInterval = () => {
      // Clear any existing interval before starting a new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Set a new interval and store its ID in the ref
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000); // Increment count every 1 second
    };
  
    const clearIntervalHandler = () => {
      // Clear the interval if it exists
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Reset the ref after clearing
      }
    };
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={startInterval}>Start Interval</button>
        <button onClick={clearIntervalHandler}>Clear Interval</button>
      </div>
    );
  }
  

