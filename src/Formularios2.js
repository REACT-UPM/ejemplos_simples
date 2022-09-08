import { useState } from "react";

//formularios con validación de input de usuario
export default function Formularios2() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  function onSubmit() {
    console.log("Name value: " + name);
  }
  function checkName(content) {
    if(content.startsWith('p') || content.startsWith('a')) {
      setName(content);      
    } else {
      setError("Nombre tiene que empezar por 'p' o por 'a'");
    }
  }
  return (<>
    {error && <div className="Error">{error}</div>}
    <form onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="Tu nombre" 
        value={name} onChange={(e) => checkName(e.target.value)} required />      
      <input type="submit" value="Submit" />
    </form>
    </>
  );
}

