import { useState } from "react";

// 🔴 INSEGURO: usar directamente en `href` lo que escribió el usuario.
// React no valida ni sanea URLs -- si el valor empieza por
// "javascript:", el navegador lo interpreta como código y lo ejecuta
// al hacer click en el enlace. No hace falta ningún <script> ni
// dangerouslySetInnerHTML: basta con un href normal.
//
// Pruébalo: escribe esto en el cuadro y pulsa "Guardar enlace":
//   javascript:alert(document.cookie)
// Haz click en el enlace "Su web" que aparece debajo -- el alert()
// salta.
export default function EnlaceInseguro() {
  const [url, setUrl] = useState("");
  const [guardada, setGuardada] = useState(null);

  function guardar() {
    if (!url.trim()) return;
    setGuardada(url);
  }

  return (
    <div>
      <h2>🔴 Inseguro (href sin validar)</h2>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="javascript:alert(document.cookie)"
        style={{ width: "100%" }}
      />
      <button onClick={guardar}>Guardar enlace</button>
      {guardada && (
        <p>
          {/* 👈 href={guardada}: lo que sea que haya escrito el usuario, tal cual */}
          <a href={guardada}>Su web</a>
        </p>
      )}
    </div>
  );
}
