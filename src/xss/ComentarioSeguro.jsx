import { useState } from "react";

// ✅ SEGURO: React escapa automáticamente cualquier valor que
// interpoles con {texto} dentro del JSX. Da igual lo que escriba el
// usuario -- etiquetas, atributos de evento, lo que sea -- React lo
// trata siempre como texto plano, nunca como HTML.
//
// Pruébalo: pega esto en el cuadro de texto y pulsa "Publicar":
//   <img src=x onerror="alert('XSS')">
// Verás la etiqueta escrita tal cual en pantalla (como texto), pero el
// alert() NUNCA salta -- el navegador no llega a interpretar ese texto
// como HTML.
export default function ComentarioSeguro() {
  const [texto, setTexto] = useState("");
  const [comentarios, setComentarios] = useState([]);

  function publicar() {
    if (!texto.trim()) return;
    setComentarios((prev) => [...prev, { id: crypto.randomUUID(), texto }]);
    setTexto("");
  }

  return (
    <div>
      <h2>✅ Seguro (JSX normal)</h2>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Prueba: <img src=x onerror="alert(1)">'
        style={{ width: "100%", height: "4rem" }}
      />
      <button onClick={publicar}>Publicar</button>
      <ul>
        {comentarios.map((c) => (
          // 👈 {c.texto}: siempre se pinta como texto, nunca como HTML.
          <li key={c.id}>{c.texto}</li>
        ))}
      </ul>
    </div>
  );
}
