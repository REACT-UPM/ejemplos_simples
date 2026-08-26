import EjemploJS from "./ProductoJS";
import EjemploTS from "./ProductoTS";

// Comparación en vivo del mismo fallo (precio como string, enStock="no"
// interpretado como verdadero) con y sin tipos. Los dos renderizan
// exactamente igual -- lo único distinto es que ProductoTS.tsx tiene un
// aviso en rojo en el editor antes incluso de guardar el fichero.
export default function App() {
  return (
    <div>
      <h1>JavaScript vs TypeScript</h1>

      <h2>JavaScript (sin tipos)</h2>
      <EjemploJS />

      <h2>TypeScript (con tipos)</h2>
      <EjemploTS />
    </div>
  );
}
