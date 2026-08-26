import ComentarioSeguro from "./ComentarioSeguro";
import ComentarioInseguro from "./ComentarioInseguro";
import EnlaceSeguro from "./EnlaceSeguro";
import EnlaceInseguro from "./EnlaceInseguro";

// Dos casos de XSS distintos, cada uno con su versión segura/insegura
// una junto a la otra: texto insertado en el DOM
// (dangerouslySetInnerHTML) y URLs usadas como href (esquema
// javascript:). Pega el mismo payload en las dos versiones de cada
// caso y compara qué pasa.
export default function App() {
  return (
    <div>
      <h1>XSS: JSX normal vs dangerouslySetInnerHTML</h1>
      <ComentarioSeguro />
      <hr />
      <ComentarioInseguro />

      <h1>XSS: href validado vs href sin validar</h1>
      <EnlaceSeguro />
      <hr />
      <EnlaceInseguro />
    </div>
  );
}
