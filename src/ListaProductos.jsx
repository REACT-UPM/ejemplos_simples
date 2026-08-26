import { useState } from "react";
import Producto from "./Producto";

// Estilos mínimos, en línea, solo para que checkbox / producto / botón
// queden alineados en fila -- compartidos por los dos carritos.
const estiloLista = { listStyle: "none", padding: 0 };
const estiloItem = { display: "flex", alignItems: "center", gap: "0.75rem" };
const estiloProducto = { flex: 1 };

// Productos iniciales, compartidos por los dos ejemplos de abajo. Cada
// uno tiene un id propio y estable, independiente de en qué posición
// del array esté.
const productosIniciales = [
  { id: 1, name: "Coca-cola", price: 0.45 },
  { id: 2, name: "Chocolate", price: 1.24 },
  { id: 3, name: "Popcorn", price: 1.98 },
];

// 🔴 MAL: key={index}. Mientras la lista no cambie de tamaño ni de
// orden, usar el índice "funciona" -- por eso este error es tan fácil de
// dejar pasar. El problema aparece en cuanto BORRAS un elemento: React
// usa la key para decidir qué nodo del DOM reutilizar entre renders, y
// si la key es solo la posición, cada producto que queda por debajo del
// borrado "hereda" la key (y por tanto el DOM, y por tanto el estado del
// checkbox) del que antes ocupaba esa posición -- aunque sea un producto
// totalmente distinto.
//
// Pruébalo: marca el checkbox de "Chocolate" (el del medio) y borra
// "Coca-cola" (el primero). El checkbox de Chocolate se queda SIN
// marcar, y el de Popcorn aparece MARCADO -- el estado ha saltado al
// producto de al lado, porque Popcorn ha heredado la key (key=1) y el
// nodo del DOM que antes eran de Chocolate.
function CarritoMaloConIndex() {
  const [productos, setProductos] = useState(productosIniciales);

  const borrar = (id) => setProductos(productos.filter((p) => p.id !== id));

  return (
    <ul style={estiloLista}>
      {productos.map((producto, index) => (
        <li key={index} style={estiloItem} /* 🔴 no deberíamos usar el índice */>
          <input type="checkbox" />
          <span style={estiloProducto}>
            <Producto productName={producto.name} costInEuros={producto.price} />
          </span>
          <button onClick={() => borrar(producto.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  );
}

// ✅ BIEN: key={producto.id}. El id es estable y pertenece al propio
// producto, no a su posición en el array. Borra el que quieras: los
// checkboxes se quedan pegados al producto correcto, porque ahora React
// sí puede distinguir "es el mismo elemento de antes" de "es uno nuevo".
function CarritoBuenoConId() {
  const [productos, setProductos] = useState(productosIniciales);

  const borrar = (id) => setProductos(productos.filter((p) => p.id !== id));

  return (
    <ul style={estiloLista}>
      {productos.map((producto) => (
        <li key={producto.id} style={estiloItem}>
          <input type="checkbox" />
          <span style={estiloProducto}>
            <Producto productName={producto.name} costInEuros={producto.price} />
          </span>
          <button onClick={() => borrar(producto.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  );
}

export default function ListaProductos() {
  return (
    <div>
      <h1>Shopping cart bad</h1>
      <CarritoMaloConIndex />

      <h1>Shopping cart good</h1>
      <CarritoBuenoConId />
    </div>
  );
}
