import { useState } from "react";

// 🔴 ROTO a propósito.
//
// Mismo árbol de componentes que en App.jsx:
//   AppRoto
//    ├── TextInputRoto
//    ├── ShoppingListRota (Lista de la compra)
//    │     └── ItemRoto × n
//    └── ShoppingListRota (Ya comprados)
//          └── ItemRoto × n
//
// TextInputRoto y las dos ShoppingListRota cuelgan directamente de
// AppRoto: son hermanos. Cada una guarda AQUÍ, con su propio useState,
// lo que cree que es "su" lista de productos.
//
// El problema se ve muy claro con el botón ✓: en teoría debería MOVER
// el producto a la otra lista, pero cada ShoppingListRota vive en su
// propia burbuja de estado y no tiene ningún camino (las props solo
// bajan de padres a hijos) para avisar a su hermana. Lo único que
// puede hacer es borrar el producto de sí misma -- así que pulsar ✓
// hace que el producto desaparezca... y nunca aparece en la otra
// lista.
function TextInputRoto() {
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

function ShoppingListRota({ titulo, productosIniciales }) {
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

function ItemRoto({ producto, onCheck, onBorrar }) {
  return (
    <li className="shopapp-item">
      <span>{producto.nombre}</span>
      <span>
        <button className="shopapp-check" onClick={() => onCheck(producto.id)}>
          ✓
        </button>
        <button className="shopapp-delete" onClick={() => onBorrar(producto.id)}>
          ✕
        </button>
      </span>
    </li>
  );
}

export default function AppRoto() {
  return (
    <div className="shopapp-container">
      <style>{estilos}</style>
      <h1>ShopAPP (roto)</h1>
      <TextInputRoto />
      <ShoppingListRota
        titulo="Lista de la compra"
        productosIniciales={[
          { id: "p1", nombre: "pilas" },
          { id: "p2", nombre: "pronto" },
          { id: "p3", nombre: "carne" },
        ]}
      />
      <ShoppingListRota
        titulo="Ya comprados"
        productosIniciales={[
          { id: "c1", nombre: "yogures" },
          { id: "c2", nombre: "leche" },
        ]}
      />
    </div>
  );
}

const estilos = `
  .shopapp-container {
    max-width: 420px;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: Arial, Helvetica, sans-serif;
    background: #fff;
    color: #222;
  }
  .shopapp-container h1 {
    margin: 0 0 20px;
    font-size: 2rem;
  }
  .shopapp-form {
    margin-bottom: 24px;
  }
  .shopapp-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  .shopapp-add {
    padding: 8px 22px;
    border: none;
    border-radius: 4px;
    background: #2f6fb0;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }
  .shopapp-add:hover {
    background: #255a91;
  }
  .shopapp-section-title {
    font-size: 1.5rem;
    margin: 0 0 10px;
  }
  .shopapp-list {
    list-style: none;
    margin: 0 0 20px;
    padding: 0;
  }
  .shopapp-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin-bottom: 8px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }
  .shopapp-check,
  .shopapp-delete {
    border: none;
    border-radius: 4px;
    color: #fff;
    padding: 4px 10px;
    margin-left: 8px;
    cursor: pointer;
  }
  .shopapp-check {
    background: #4caf50;
  }
  .shopapp-delete {
    background: #e53935;
  }
`;
