import Item from "./Item.jsx";

// 👈 Sin estado propio: recibe `productos` ya calculado y solo pinta.
// Cuando el usuario pulsa ✓ o ✕, no cambia nada ella misma -- avisa
// hacia arriba llamando a onCheck(id) / onBorrar(id), y es App quien
// decide qué hacer con ese evento (mover el producto o borrarlo).
export default function ShoppingList({ titulo, productos, onCheck, onBorrar }) {
  return (
    <section>
      <h2 className="shopapp-section-title">{titulo}</h2>
      <ul className="shopapp-list">
        {productos.map((p) => (
          <Item key={p.id} producto={p} onCheck={onCheck} onBorrar={onBorrar} />
        ))}
      </ul>
    </section>
  );
}
