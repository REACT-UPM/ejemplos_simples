import { useState } from "react";

export default function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p>{count}</p>
      <button 
        onClick={() => setCount(count + 1)} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Incrementar
      </button>
    </div>
  );
}
