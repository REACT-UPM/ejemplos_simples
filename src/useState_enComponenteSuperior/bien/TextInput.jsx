import { useState } from "react";

export default function TextInput({ onAñadir }) {
  // 👈 Este estado NO sube: solo le importa a él (es el texto que se
  // está escribiendo ahora mismo, antes de pulsar "Añadir"). Nadie más
  // en la app necesita saber lo que hay a medio escribir en este input.
  const [texto, setTexto] = useState("");

  function manejarAñadir() {
    if (!texto.trim()) return;
    onAñadir(texto);
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
      <button className="shopapp-add" onClick={manejarAñadir}>
        Añadir
      </button>
    </div>
  );
}
