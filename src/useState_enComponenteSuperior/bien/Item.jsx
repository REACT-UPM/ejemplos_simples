export default function Item({ producto, onCheck, onBorrar }) {
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
