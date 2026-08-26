import { useState } from "react";

// 🔴 ROTO a propósito.
//
// AñadirProductoRoto y ListaCompraRota son hermanos: los dos cuelgan
// directamente de AppRoto, uno al lado del otro. Cada uno guarda AQUÍ,
// con su propio useState, lo que cree que es "la lista de productos".
//
// El problema: las props solo bajan de padres a hijos. Entre dos
// hermanos no hay ningún camino directo para pasarse datos. Así que por
// mucho que añadas productos en AñadirProductoRoto, ListaCompraRota
// jamás se entera: vive en su propia "burbuja" de estado, aislada de la
// de su hermano, aunque las dos se llamen igual (`productos`) y las dos
// vivan en el mismo árbol.
function AñadirProductoRoto() {
  const [texto, setTexto] = useState("");
  const [productos, setProductos] = useState([]); // 🔴 su propia copia de la lista

  function añadir() {
    if (!texto.trim()) return;
    setProductos((prev) => [...prev, { id: crypto.randomUUID(), nombre: texto }]);
    setTexto("");
  }

  return (
    <div>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nuevo producto"
      />
      <button onClick={añadir}>Añadir</button>
      <p>
        AñadirProducto lleva guardados {productos.length} producto(s) -- pero
        solo él lo sabe.
      </p>
    </div>
  );
}

function ListaCompraRota() {
  // 🔴 Otra copia distinta de "productos", que empieza vacía y nadie
  // desde fuera se la rellena nunca: no tiene ninguna prop por la que
  // pudiera enterarse de lo que pasa en su hermano.
  const [productos] = useState([]);

  if (productos.length === 0) {
    return (
      <p>
        No hay productos todavía. Añade uno arriba y comprueba que esto
        NO cambia.
      </p>
    );
  }

  return (
    <ul>
      {productos.map((p) => (
        <li key={p.id}>{p.nombre}</li>
      ))}
    </ul>
  );
}

export default function AppRoto() {
  return (
    <div>
      <h2>Roto: dos hermanos, cada uno con su propio estado</h2>
      <AñadirProductoRoto />
      <hr />
      <ListaCompraRota />
    </div>
  );
}
