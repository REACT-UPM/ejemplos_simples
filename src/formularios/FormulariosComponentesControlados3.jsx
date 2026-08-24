import { useState } from "react";

export default function FormulariosComponentesControlados3() {
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

/* La manera "React 19" de hacer este mismo formulario sería con
   <form action={fn}> y FormData, en lugar de useState + value + onChange
   + preventDefault:

import { useState } from "react";

export default function FormulariosComponentesControlados3Action() {
  const [valor, setValor] = useState(null);

  function enviar(formData) {
    // formData.get busca por el atributo `name` del <select>. Por eso
    // aquí, a diferencia del <select> de arriba, hace falta añadirle
    // name="valor".
    setValor(formData.get("valor"));
  }

  return (
    <>
      {valor ? <div>Valor elegido: {valor}</div> : <div>No se ha elegido ningún valor</div>}
      <br /><br />
      <form action={enviar}>
        <label>
          Elige el valor:
          <select name="valor" defaultValue="valor1">
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

   Fíjate en lo que desaparece: no hay onChange en cada tecla/selección,
   no hay preventDefault, y el <select> pasa de ser controlado (value +
   onChange) a no controlado (defaultValue). React solo nos avisa una vez,
   al enviar, con el valor final ya dentro del FormData.
*/
