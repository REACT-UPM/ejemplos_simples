import { useState, useEffect } from "react";

// Versión mejorada de CargaDatos.jsx. Corrige los cuatro defectos reales de
// aquel componente:
//
//   1. No había estado de carga -> data empezaba en null y el primer
//      render pintaba literalmente la palabra "null" en el <pre>.
//   2. No había estado de error -> los fallos iban a console.log, donde el
//      usuario nunca los ve.
//   3. No cancelaba la petición -> sin AbortController, si el componente
//      se desmontaba o `url` cambiaba, una respuesta vieja podía llegar
//      tarde y pisar a la nueva.
//   4. Con StrictMode, el efecto se ejecuta dos veces en desarrollo, y eso
//      interactúa directamente con el problema 3 (ver el comentario junto
//      al `return` del useEffect, más abajo).
export default function CargaDatosMejorado({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // Arranca en true (no en false): así, en el primerísimo render, el
  // componente ya sabe que está cargando y no tiene que fingir que ya
  // tiene datos que en realidad no ha pedido todavía.
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // AbortController es la forma estándar del navegador (no es cosa de
    // React) de decirle a un fetch en marcha "ya no me interesa esta
    // respuesta, no la esperes". Cada vez que el efecto se vuelve a
    // ejecutar (porque `url` cambia, o porque StrictMode lo relanza en
    // desarrollo) se crea un controller nuevo para la petición nueva.
    const controller = new AbortController();

    // Si `url` cambia, hay que "olvidar" el data/error de la URL
    // anterior y volver a mostrar el estado de carga mientras llega la
    // respuesta nueva.
    setCargando(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        // fetch solo rechaza la promesa si falla la conexión en sí (sin
        // red, DNS, etc.); un 404 o un 500 sí "tienen éxito" como
        // petición HTTP. Por eso hay que comprobar res.ok a mano y
        // lanzar nosotros el error si el servidor respondió mal.
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setCargando(false);
      })
      .catch((e) => {
        // Cuando llamamos a controller.abort() (ver el cleanup de más
        // abajo), el propio fetch rechaza su promesa con un error
        // llamado "AbortError". Eso NO es un fallo real de la petición:
        // es nuestra propia cancelación volviendo como error. Si no la
        // distinguiéramos aquí, se mostraría "Error: signal is aborted"
        // aunque la petición nueva haya ido perfectamente.
        if (e.name === "AbortError") return; // cancelación esperada
        setError(e.message);
        setCargando(false);
      });

    // La función que devuelve un useEffect es su "cleanup": React la
    // llama automáticamente antes de volver a ejecutar el efecto, y
    // también cuando el componente se desmonta. Aquí cancelamos
    // cualquier petición que hubiera quedado en marcha.
    //
    // Esto es justo lo que arregla, de rebote, el problema del punto 4:
    // en desarrollo con StrictMode, React monta el componente, ejecuta
    // el efecto, lo DESMONTA, llama al cleanup (que aborta esa primera
    // petición) y lo vuelve a montar ejecutando el efecto otra vez. La
    // primera petición nunca llega a completarse -> nunca llama a
    // setData/setError -> no hay ningún efecto visible de esa doble
    // ejecución. Sin este cleanup, sí habría dos fetch reales en marcha
    // a la vez, con el riesgo de que el primero termine después que el
    // segundo y pise sus datos.
    return () => controller.abort();
  }, [url]);

  // El orden de estos dos if importa: si hay error, ya no está
  // "cargando" en el sentido de "esperando una respuesta útil", así que
  // preferimos enseñar el error a que se quede colgado en "Cargando...".
  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}