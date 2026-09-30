import { useState } from "react";

export default function TextInputRoto() {
  const [texto, setTexto] = useState("");
  const [productos, setProductos] = useState([]); // 🔴 su propia copia de la lista

  function añadir() {
    if (!texto.trim()) return;
    setProductos((prev) => [...prev, { id: crypto.randomUUID(), nombre: texto }]);
    setTexto("");
  }

  return (
    <div className="shopapp-form">
      <input
        className="shopapp-input"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Producto a comprar"
      />
      <button className="shopapp-add" onClick={añadir}>
        Añadir
      </button>
      <p>
        TextInput lleva guardados {productos.length} producto(s) -- pero
        ninguna lista de abajo se entera.
      </p>
    </div>
  );
}
