import { useState } from "react";
import TextInput from "./TextInput.jsx";
import ShoppingList from "./ShoppingList.jsx";

// ✅ Arreglado: "lifting state up".
//
// Árbol de componentes:
//   App
//    ├── TextInput
//    ├── ShoppingList (Lista de la compra)
//    │     └── Item × n
//    └── ShoppingList (Ya comprados)
//          └── Item × n
//
// TextInput y las dos ShoppingList son HERMANOS: cuelgan directamente
// de App. Marcar un producto como comprado significa MOVERLO de una
// lista a la otra -- algo que solo es posible porque las dos leen del
// mismo estado, guardado en el ANCESTRO COMÚN (App). Si cada lista
// tuviera su propio useState (ver ListaCompraRota.jsx), mover un producto de
// una a otra sería imposible: las props solo bajan de padres a hijos,
// nunca de hermano a hermano.
export default function App() {
  const [pendientes, setPendientes] = useState([
    { id: "p1", nombre: "pilas" },
    { id: "p2", nombre: "pronto" },
    { id: "p3", nombre: "carne" },
  ]);
  const [comprados, setComprados] = useState([
    { id: "c1", nombre: "yogures" },
    { id: "c2", nombre: "leche" },
  ]);

  function añadir(nombre) {
    setPendientes((prev) => [...prev, { id: crypto.randomUUID(), nombre }]);
  }

  function marcarComprado(id) {
    const producto = pendientes.find((p) => p.id === id);
    if (!producto) return;
    setPendientes((prev) => prev.filter((p) => p.id !== id));
    setComprados((prev) => [...prev, producto]);
  }

  function marcarPendiente(id) {
    const producto = comprados.find((p) => p.id === id);
    if (!producto) return;
    setComprados((prev) => prev.filter((p) => p.id !== id));
    setPendientes((prev) => [...prev, producto]);
  }

  function borrarPendiente(id) {
    setPendientes((prev) => prev.filter((p) => p.id !== id));
  }

  function borrarComprado(id) {
    setComprados((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="shopapp-container">
      <style>{estilos}</style>
      <h1>ShopAPP</h1>
      <TextInput onAñadir={añadir} /> {/* baja la función */}
      <ShoppingList
        titulo="Lista de la compra"
        productos={pendientes}
        onCheck={marcarComprado}
        onBorrar={borrarPendiente}
      />
      <ShoppingList
        titulo="Ya comprados"
        productos={comprados}
        onCheck={marcarPendiente}
        onBorrar={borrarComprado}
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
