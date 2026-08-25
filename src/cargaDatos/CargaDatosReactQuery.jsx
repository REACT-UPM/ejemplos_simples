import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

// A diferencia de los dos ejemplos anteriores (use() a pelo, y use() con
// caché casera hecha con un Map), aquí la caché no la escribimos
// nosotros: la trae @tanstack/react-query. La idea de fondo es la misma
// que en CargaDatosUseConCache.jsx (no volver a lanzar la petición si ya
// hay una en marcha o resuelta para la misma clave), pero react-query se
// encarga de mucho más: deduplicar peticiones simultáneas, refrescar
// datos obsoletos, reintentar si falla, compartir el resultado entre
// componentes distintos que pidan la misma queryKey, etc. Por eso en el
// siguiente paso de la asignatura usaremos esto en vez de reinventarlo.
//
// useSuspenseQuery es la versión de useQuery pensada para usarse con
// <Suspense>: en vez de devolver un estado "isLoading" que hay que
// comprobar a mano, SUSPENDE el componente mientras no haya datos (como
// hacía use()), y solo devuelve el render cuando `data` ya está listo.
function Usuario({ id }) {
  const { data } = useSuspenseQuery({
    // queryKey identifica esta petición dentro de la caché de
    // react-query. Si otro componente pide la misma queryKey (mismo
    // ["usuario", id]), reutiliza el resultado en vez de volver a
    // pedirlo.
    queryKey: ["usuario", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/users/${id}`).then((r) => r.json()),
  });

  return (
    <p>
      {data.firstName} {data.lastName}
    </p>
  );
}

// useSuspenseQuery necesita, igual que use(), un <Suspense> por encima
// que atrape la suspensión mientras llega el dato. También necesita, más
// arriba en el árbol, un <QueryClientProvider> que le proporcione el
// QueryClient donde vive la caché: ver mainCargaDatosConProvider.jsx,
// junto a main.jsx.
export default function CargaDatosReactQuery() {
  return (
    <div>
      <p>Con react-query no hace falta escribir la caché a mano.</p>
      <Suspense fallback={<p>Cargando...</p>}>
        <Usuario id={1} />
      </Suspense>
    </div>
  );
}
