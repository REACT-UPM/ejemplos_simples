import { Suspense, use } from "react";

// Arregla el bucle infinito de CargaDatosUseSinCache.jsx con la pieza que
// faltaba: una caché.
//
// El problema de la versión sin caché no era usar use() ni fetch(): era
// que cada render creaba un objeto Promise NUEVO para la misma url. Aquí
// la caché rompe eso: guarda, para cada url, la promesa que se generó la
// PRIMERA vez, y la reutiliza en cualquier render posterior.
const cache = new Map();

function obtener(url) {
  if (!cache.has(url)) {
    // Esto solo se ejecuta la primera vez que se pide esta url. A partir
    // de aquí, cache.get(url) siempre devuelve ESTA MISMA promesa (mismo
    // objeto, no una equivalente), aunque obtener() se llame de nuevo en
    // el siguiente render.
    cache.set(
      url,
      fetch(url).then((r) => r.json())
    );
  }
  return cache.get(url);
}

// Al llamar a obtener(url) en vez de fetch(url) directamente, Usuario le
// pasa a use() siempre la misma promesa mientras la url no cambie:
//   - Primer render: la promesa está pendiente -> use() suspende ->
//     se pinta el fallback.
//   - Esa promesa se resuelve -> React vuelve a renderizar Usuario.
//   - Segundo render: obtener(url) mira la caché, la encuentra y
//     devuelve la MISMA promesa de antes, que ya está resuelta -> use()
//     no tiene que esperar nada y devuelve el valor al momento.
// No hay ninguna promesa nueva esperando a mitad de camino, así que no
// hay nada que dispare otro render, y el bucle no puede empezar.
function Usuario({ url }) {
  const u = use(obtener(url));
  return <p>{u.name}</p>;
}

// Usamos /usuario.json (archivo estático en public/) por el mismo motivo
// que en la versión sin caché: no depende de una API real, así que da
// igual cuánta gente lo pruebe a la vez.
export default function CargaDatosUseConCache() {
  return (
    <div>
      <p>
        Esta vez no hay bucle: la caché hace que la promesa de una misma
        url se reutilice entre renders.
      </p>
      <Suspense fallback={<p>Cargando...</p>}>
        <Usuario url="/usuario.json" />
      </Suspense>
    </div>
  );
}
