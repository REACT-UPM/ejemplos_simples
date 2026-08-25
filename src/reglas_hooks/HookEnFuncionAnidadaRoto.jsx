import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary.jsx";

// 🔴 ROTO a propósito: viola la Regla 1 de los Hooks, en su variante
// "función anidada" ("nunca... dentro de una función anidada").
function ContadorRoto({ modoDoble }) {
  const [nombre] = useState("Ana"); // Hook #1, siempre se ejecuta

  // 🔴 Esta función está definida DENTRO del componente y llama a un
  // Hook en su interior. Que esté "envuelta" en su propia función no la
  // libra de la regla: sigue sin estar en el nivel superior de
  // ContadorRoto. Y encima aquí solo se invoca cuando modoDoble es
  // true, así que el Hook de dentro se llama o no según ese valor.
  function crearContadorExtra() {
    const [extra, setExtra] = useState(0);
    return [extra, setExtra];
  }

  let extra, setExtra;
  if (modoDoble) {
    [extra, setExtra] = crearContadorExtra();
  }

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

// Al activar "modo doble" la primera vez, todo va bien: React solo está
// viendo, por primera vez, que en ESTE render se llaman dos Hooks en vez
// de uno. El problema aparece al cambiar modoDoble otra vez (activar o
// desactivar): el useState de dentro de crearContadorExtra() a veces se
// llama y a veces no, y React deja de poder fiarse del orden. Mismo tipo
// de error que en HookTrasReturnRoto.jsx: "Rendered fewer hooks than
// expected" (o su pareja "Rendered more hooks than during the previous
// render", según en qué dirección cambies modoDoble). Mira la consola.
export default function HookEnFuncionAnidadaRoto() {
  const [modoDoble, setModoDoble] = useState(false);
  const [intento, setIntento] = useState(0);

  return (
    <div>
      <p>
        Activa "modo doble" y luego cambia otra vez: crearContadorExtra()
        pasa de llamarse a no llamarse (o al revés), y su useState
        aparece y desaparece de en medio.
      </p>
      <button onClick={() => setModoDoble((v) => !v)}>
        {modoDoble ? "Desactivar" : "Activar"} modo doble
      </button>
      <button onClick={() => setIntento((i) => i + 1)}>
        Reiniciar ejemplo (tras el error)
      </button>

      <ErrorBoundary key={intento}>
        <ContadorRoto modoDoble={modoDoble} />
      </ErrorBoundary>
    </div>
  );
}
