import { useState } from "react";

// Hasta ahora, con useRef: creamos un objeto con useRef(), se lo pasamos
// al elemento como `ref` y React nos rellena `.current` con el nodo del
// DOM cuando se monta.
//
// Hay una segunda forma de usar `ref`: pasarle directamente una función
// (una "ref de callback"). React la llama con el nodo del DOM en cuanto
// el elemento se monta:
//
//   <input ref={(nodo) => { console.log(nodo); }} />
//
// Sirve para cuando necesitas HACER algo en el momento en que el nodo
// aparece (medirlo, engancharle una librería externa, hacerle focus...),
// no solo guardarlo para usarlo más tarde.
//
// Novedad de React 19: esa función puede devolver, a su vez, una función
// de limpieza. React la ejecuta cuando el elemento se quita del DOM. Es
// exactamente el mismo patrón que ya conocemos del `return` de useEffect:
// "esto hago al aparecer, esto deshago al desaparecer".
export default function UseRefCallbackConLimpieza() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <p>Abre la consola para ver cuándo se monta y se desmonta el input.</p>

      <button onClick={() => setVisible((v) => !v)}>
        {visible ? "Ocultar input" : "Mostrar input"}
      </button>

      {visible && (
        <input
          ref={(nodo) => {
            // Se ejecuta justo cuando el <input> aparece en el DOM.
            console.log("🟢 Input montado: le hago focus.");
            nodo.focus();

            // Esta función de retorno es la limpieza: React la llama
            // cuando el <input> se desmonta (aquí, al pulsar el botón
            // para ocultarlo). Con React 19, esto sustituye a tener que
            // volver a llamar a la ref con `null`, como pasaba antes.
            return () => {
              console.log("🔴 Input desmontado: limpieza ejecutada.");
            };
          }}
          placeholder="Me enfoco solo al aparecer"
        />
      )}
    </div>
  );
}

// Nota sobre StrictMode (main.jsx envuelve la app en <StrictMode>): en
// desarrollo, CADA VEZ que el input se monta (la primera vez, y también
// cada vez que lo vuelves a mostrar tras ocultarlo) verás en consola
// montado -> limpieza -> montado otra vez. No es un bug del ejemplo: es
// React comprobando a propósito, en cada montaje, que tu función de
// limpieza deja las cosas como si nunca se hubiera montado -- monta y
// desmonta una vez de más antes del montaje "real". Es el mismo
// comportamiento que ya conocemos de useEffect en StrictMode. En
// producción eso no ocurre: solo verás un "🟢 Input montado" por cada
// vez que aparece.
