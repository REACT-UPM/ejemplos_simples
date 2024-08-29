import { useState } from "react";

export default function Formularios3() {
  const [valor, setValor] = useState("");

  function onSubmit(event) {
    console.log("value: " + valor);
    event.preventDefault();
  }

  function handleChange(event){
    setValor(event.target.value);
  }

  return (<>
    {valor ? <div>Valor elegido: {valor}</div>:<div>No se ha elegido ningún valor</div>}
    <br/><br/>
    <form onSubmit={(e)=>onSubmit(e)}>
      <label>
          Elige el valor:
          <select value={valor} onChange={handleChange}>
            <option value="valor1">valor1</option>
            <option value="valor2">valor2</option>
            <option value="valor3">valor3</option>
          </select>
        </label>
      <input type="submit" value="Submit" />
    </form>
    </>
  );
}

