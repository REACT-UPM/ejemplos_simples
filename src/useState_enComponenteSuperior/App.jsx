import { useState } from "react";

// ✅ Arreglado: "lifting state up".
//
// AñadirProducto quiere añadir productos; ListaCompra quiere pintarlos.
// Son hermanos, así que no hay props que viajen directamente del uno al
// otro (ver AppRoto.jsx). La solución es subir el estado al ANCESTRO
// COMÚN más cercano de los dos -- aquí, App -- y desde ahí:
//   - los DATOS bajan como props (`productos` hacia ListaCompra),
//   - los EVENTOS suben como funciones (App le pasa `añadir` y `borrar`
//     a cada hijo; cuando el hijo las llama, es App quien de verdad
//     actualiza el estado).
export default function App() {
  const [productos, setProductos] = useState([]); // 👈 el estado vive aquí

  function añadir(nombre) {
    setProductos((prev) => [...prev, { id: crypto.randomUUID(), nombre }]);
  }

  function borrar(id) {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h2>Arreglado: el estado vive en el ancestro común</h2>
      <AñadirProducto onAñadir={añadir} /> {/* baja la función */}
      <ListaCompra productos={productos} onBorrar={borrar} /> {/* bajan datos y función */}
    </div>
  );
}



// 👈 Sin estado propio: recibe `productos` ya calculado y solo pinta.
// Cuando el usuario pulsa "Borrar", no borra nada ella misma -- avisa
// hacia arriba llamando a onBorrar(id), y es App quien decide qué hacer
// con ese evento.
function ListaCompra({ productos, onBorrar }) {
  if (productos.length === 0) {
    return <p>No hay productos todavía.</p>;
  }

  return (
    <ul>
      {productos.map((p) => (
        <li key={p.id}>
          {p.nombre}
          <button onClick={() => onBorrar(p.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  );
}
