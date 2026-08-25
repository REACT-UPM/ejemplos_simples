import { useState } from "react";

// ✅ Arreglado: ya no hace falta ninguna función anidada. El useState de
// "extra" va directamente en el nivel superior de ContadorArreglado,
// SIEMPRE se llama, y solo decidimos condicionalmente si lo MOSTRAMOS en
// el JSX. Eso sí está permitido: lo que nunca puede ser condicional es
// la llamada al Hook en sí, no el uso que le des después a su valor.
function ContadorArreglado({ modoDoble }) {
  const [nombre] = useState("Ana");
  const [extra, setExtra] = useState(0);

  return (
    <div>
      <p>{nombre}</p>
      {modoDoble && (
        <>
          <p>Extra: {extra}</p>
          <button onClick={() => setExtra((e) => e + 1)}>Sumar extra</button>
        </>
      )}
    </div>
  );
}

// Mismo ejemplo que HookEnFuncionAnidadaRoto.jsx, pero ahora se puede
// activar y desactivar "modo doble" todo lo que quieras sin que se
// rompa, y el contador extra conserva su valor aunque lo ocultes.
export default function HookEnFuncionAnidadaArreglado() {
  const [modoDoble, setModoDoble] = useState(false);

  return (
    <div>
      <p>Activa y desactiva "modo doble" todo lo que quieras: no se rompe.</p>
      <button onClick={() => setModoDoble((v) => !v)}>
        {modoDoble ? "Desactivar" : "Activar"} modo doble
      </button>

      <ContadorArreglado modoDoble={modoDoble} />
    </div>
  );
}
