import { useState } from "react";

// 🔴 INSEGURO: dangerouslySetInnerHTML le dice a React "no escapes
// esto, insértalo tal cual como HTML". Si ese HTML viene de lo que
// escribió el usuario, cualquier atributo de evento (onerror, onload,
// onclick...) se ejecuta como si lo hubieras escrito tú -- eso es un
// XSS (Cross-Site Scripting).
//
// Pruébalo: pega lo mismo que en la versión segura:
//   <img src=x onerror="alert('XSS')">
// Esta vez SÍ salta el alert(): el navegador intenta cargar una imagen
// que no existe, falla, y ejecuta el onerror que venía en el HTML
// insertado. (Un <script>...</script> insertado así NO se ejecutaría
// -- es una rareza del propio navegador -- por eso el ataque real casi
// siempre usa onerror/onload en vez de <script>.)
export default function ComentarioInseguro() {
  const [texto, setTexto] = useState("");
  const [comentarios, setComentarios] = useState([]);

  function publicar() {
    if (!texto.trim()) return;
    setComentarios((prev) => [...prev, { id: crypto.randomUUID(), texto }]);
    setTexto("");
  }

  return (
    <div>
      <h2>🔴 Inseguro (dangerouslySetInnerHTML)</h2>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Prueba: <img src=x onerror="alert(1)">'
        style={{ width: "100%", height: "4rem" }}
      />
      <button onClick={publicar}>Publicar</button>
      <ul>
        {comentarios.map((c) => (
          // 👈 dangerouslySetInnerHTML inserta `c.texto` como HTML real,
          // sin escapar nada -- de ahí lo explícito del nombre.
          <li key={c.id} dangerouslySetInnerHTML={{ __html: c.texto }} />
        ))}
      </ul>
    </div>
  );
}
