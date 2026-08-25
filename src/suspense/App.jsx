import { lazy, Suspense, useState } from "react";

// lazy() recibe una función que llama a import() de forma dinámica.
// A diferencia de un import normal (que se resuelve en el bundle desde el
// principio), este código de PerfilUsuario.jsx no se descarga hasta que
// React necesita renderizarlo por primera vez. Con herramientas como Vite
// esto se traduce en un "chunk" (archivo .js) separado que solo se pide
// al navegador cuando hace falta: útil para no cargar de golpe partes de
// la app que el usuario igual nunca llega a ver (un modal, una pestaña, una
// ruta poco usada...).
//
// Aquí añadimos además un retraso artificial de 1.5s antes del import()
// solo para que la carga sea lo bastante lenta como para VER el fallback
// en clase. En un proyecto real no se hace esto: basta con
//   const PerfilUsuario = lazy(() => import("./PerfilUsuario"));
const PerfilUsuario = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 1500)).then(() =>
    import("./PerfilUsuario")
  )
);

export default function App() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div>
      <h2>Suspense + lazy: ejemplo básico</h2>
      <button onClick={() => setMostrar(true)}>Cargar perfil</button>

      {mostrar && (
        // Suspense vigila a los componentes que tiene dentro. Si alguno de
        // ellos (aquí, PerfilUsuario) todavía se está cargando, React pinta
        // el `fallback` en su lugar. En cuanto termina de cargar, sustituye
        // el fallback por el componente real, sin que tengamos que escribir
        // ningún estado de "cargando" a mano.
        <Suspense fallback={<p>Cargando componente...</p>}>
          <PerfilUsuario />
        </Suspense>
      )}
    </div>
  );
}
