import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary.jsx";

// 🔴 ROTO a propósito: viola la Regla 1 de los Hooks ("llama a los Hooks
// siempre en el nivel superior del componente, nunca dentro de un if,
// de un bucle, de una función anidada, ni después de un return").
function ContadorRoto({ mostrarDetalle }) {
  // Hook #1: este SIEMPRE se ejecuta, esté o no mostrarDetalle.
  const [nombre] = useState("Ana");

  if (!mostrarDetalle) {
    return <p>{nombre}: (detalle oculto)</p>;
  }

  // 🔴 Hook #2, TRAS el return de arriba. React identifica cada Hook
  // por el ORDEN en que se llama, no por su nombre ni por dónde está
  // escrito en el fichero. Este useState solo se ejecuta cuando
  // mostrarDetalle es true: en el render en que es false, React ni
  // siquiera llega a esta línea. En cuanto ese orden deja de coincidir
  // con el del render anterior para la MISMA instancia del componente,
  // React ya no sabe qué hueco de estado le corresponde a qué Hook, y
  // lanza un error en vez de arriesgarse a mezclarlos.
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>{nombre}</p>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador((c) => c + 1)}>Sumar</button>
    </div>
  );
}

// El primer render (mostrarDetalle=true) funciona perfectamente: React
// solo está estableciendo, por primera vez, que este componente llama a
// dos useState. El problema aparece en el SIGUIENTE render de la misma
// instancia, en cuanto ese número de Hooks deja de coincidir con el
// anterior: prueba a pulsar "Ocultar detalle" y mira la consola. Verás
// literalmente: "Rendered fewer hooks than expected. This may be caused
// by an accidental early return statement." -- React señalando la causa
// exacta.
//
// Envolvemos ContadorRoto en el ErrorBoundary que ya usamos en
// ErrorBoundary.jsx para que el fallo no se lleve por delante toda la
// página, y añadimos un botón para volver a montarlo desde cero.
export default function HookTrasReturnRoto() {
  const [mostrarDetalle, setMostrarDetalle] = useState(true);
  const [intento, setIntento] = useState(0);

  return (
    <div>
      <p>
        Pulsa "Ocultar detalle": el early return de ContadorRoto salta el
        segundo useState (el del contador) y React lanza "Rendered fewer
        hooks than expected". Mira la consola.
      </p>
      <button onClick={() => setMostrarDetalle((v) => !v)}>
        {mostrarDetalle ? "Ocultar detalle" : "Mostrar detalle"}
      </button>
      <button onClick={() => setIntento((i) => i + 1)}>
        Reiniciar ejemplo (tras el error)
      </button>

      {/* La key fuerza a React a desmontar y volver a montar el
          ErrorBoundary (y todo lo de dentro) de cero cuando pulsamos
          "Reiniciar", limpiando su estado de error. */}
      <ErrorBoundary key={intento}>
        <ContadorRoto mostrarDetalle={mostrarDetalle} />
      </ErrorBoundary>
    </div>
  );
}
