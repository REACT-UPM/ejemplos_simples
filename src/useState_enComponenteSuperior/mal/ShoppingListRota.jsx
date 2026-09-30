import { useState } from "react";
import ItemRoto from "./ItemRoto.jsx";

export default function ShoppingListRota({ titulo, productosIniciales }) {
  // 🔴 Estado propio y aislado: se inicializa con `productosIniciales`
  // (solo la primera vez que se monta) y a partir de ahí vive solo
  // aquí, sin comunicarse con sus hermanos.
  const [productos, setProductos] = useState(productosIniciales);

  function quitar(id) {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <section>
      <h2 className="shopapp-section-title">{titulo}</h2>
      <ul className="shopapp-list">
        {productos.map((p) => (
          <ItemRoto key={p.id} producto={p} onCheck={quitar} onBorrar={quitar} />
        ))}
      </ul>
    </section>
  );
}
