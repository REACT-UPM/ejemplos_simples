import { useState } from "react";

// ✅ Arreglado: los dos useState van en el nivel superior, ANTES de
// cualquier return. React los llama exactamente en el mismo orden en
// TODOS los renders, sin importar el valor de mostrarDetalle. El early
// return sigue existiendo (seguimos sin querer pintar el contador si
// mostrarDetalle es false), solo que ahora va DESPUÉS de todos los
// Hooks, nunca antes.
function ContadorArreglado({ mostrarDetalle }) {
  const [nombre] = useState("Ana");
  const [contador, setContador] = useState(0);

  if (!mostrarDetalle) {
    return <p>{nombre}: (detalle oculto)</p>;
  }

  return (
    <div>
      <p>{nombre}</p>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador((c) => c + 1)}>Sumar</button>
    </div>
  );
}

// Mismo ejemplo que HookTrasReturnRoto.jsx, pero ahora se puede ocultar
// y volver a mostrar el detalle sin que React se queje. Como
// ContadorArreglado nunca se desmonta (solo cambia lo que devuelve),
// además el contador conserva su valor mientras juegas con el botón:
// súbelo, oculta el detalle, vuelve a mostrarlo, y seguirá donde lo
// dejaste.
export default function HookTrasReturnArreglado() {
  const [mostrarDetalle, setMostrarDetalle] = useState(true);

  return (
    <div>
      <p>Oculta y muestra el detalle todo lo que quieras: no se rompe.</p>
      <button onClick={() => setMostrarDetalle((v) => !v)}>
        {mostrarDetalle ? "Ocultar detalle" : "Mostrar detalle"}
      </button>

      <ContadorArreglado mostrarDetalle={mostrarDetalle} />
    </div>
  );
}
