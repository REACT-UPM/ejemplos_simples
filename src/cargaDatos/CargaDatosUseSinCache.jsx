import { Suspense, use } from "react";

// ⚠️ EJEMPLO INTENCIONADAMENTE ROTO ⚠️
// Sirve para demostrar por qué use() necesita que la promesa que le pasas
// esté cacheada, y no se cree una nueva en cada render.
//
// Qué pasa aquí, paso a paso:
//   1. Usuario se renderiza. fetch(url).then(...) crea una promesa NUEVA
//      (un objeto Promise distinto) cada vez que se ejecuta el cuerpo de
//      la función, aunque la url sea siempre la misma.
//   2. use(promesa) mira si esa promesa concreta ya está resuelta. Como
//      se acaba de crear, está pendiente -> use() "suspende" el
//      componente: React pinta el fallback del <Suspense> más cercano
//      mientras espera a que se resuelva.
//   3. Cuando ESA promesa concreta se resuelve, React sabe que tiene que
//      volver a renderizar Usuario.
//   4. Pero al volver a renderizar, el cuerpo de Usuario se ejecuta de
//      cero otra vez: fetch(url).then(...) crea OTRA promesa nueva,
//      distinta de la anterior (aunque pida la misma url). Esa promesa
//      nueva está pendiente -> volvemos al paso 2.
//
// Resultado: un bucle infinito de peticiones de red. El componente nunca
// llega a pintar el nombre del usuario, porque siempre está esperando a
// una promesa que se acaba de crear. Abre la pestaña Network (o la
// consola: hay un console.log más abajo) y verás las peticiones
// encadenándose sin parar.
//
// Usamos /usuario.json (un archivo estático en public/) en vez de una
// API real a propósito: cada alumno lo sirve desde su propio servidor de
// Vite local, así que el bucle infinito solo satura su máquina, nunca un
// servicio externo. Si toda la clase lanza este ejemplo a la vez con una
// URL real, se le puede tirar la API a todo el mundo.
//
// La solución real (no incluida aquí, es el siguiente paso de la clase)
// es NO crear la promesa dentro del render: guardarla en una caché (por
// ejemplo un Map fuera del componente, indexado por url) para que la
// misma url devuelva siempre LA MISMA promesa, y use() pueda reutilizarla
// en vez de disparar trabajo nuevo en cada pasada.
function Usuario({ url }) {
  console.log("Usuario: creando una promesa nueva con fetch()...");
  const u = use(fetch(url).then((r) => r.json())); // 🔴 sin caché
  return <p>{u.name}</p>;
}

export default function CargaDatosUseSinCache() {
  return (
    <div>
      <p>
        <b>⚠️ Bucle infinito a propósito:</b> abre la consola o la pestaña
        Network para ver las peticiones repitiéndose sin fin.
      </p>
      <Suspense fallback={<p>Cargando... (y cargando... y cargando...)</p>}>
        <Usuario url="/usuario.json" />
      </Suspense>
    </div>
  );
}
