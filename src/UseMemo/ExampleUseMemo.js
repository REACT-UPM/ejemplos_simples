import React, { useState, useMemo } from 'react';

// Simulate an expensive calculation by calculating the sum of squares of the filtered items' lengths
const calculateExpensiveSum = (items) => {
  console.time('Expensive Calculation Time');
  console.log('Performing expensive calculation...');
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i % items.length; // Simulate a heavy operation
  }
  let myresult = items.reduce((acc, item) => acc + item.length * item.length, 0);
  console.timeEnd('Expensive Calculation Time');
  return myresult;
};

export default function ExampleUseMemo() {
  const [filter, setFilter] = useState('');
  const [items] = useState([ 'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry', 'Boysenberry', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Fig', 'Grape', 'Grapefruit', 'Guava', 'Honeydew', 'Jackfruit', 'Kiwi', 'Lemon', 'Lime', 'Lychee', 'Mango', 'Melon', 'Nectarine', 'Orange', 'Papaya', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Raspberry', 'Redcurrant', 'Strawberry', 'Tangerine', 'Tomato', 'Ugli fruit', 'Watermelon' ]);

  const filteredItems = items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));

  // Memoize the expensive calculation based on the filtered items
  const expensiveCalculation = useMemo(() => {
    return calculateExpensiveSum(filteredItems);
  }, [filteredItems.length]);

  return (
    <div>
      <h2>Expensive Calculation Result: {expensiveCalculation}</h2>
      <h1>Fruit List</h1>
      <input 
        type="text" 
        placeholder="Filter fruits..." 
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
