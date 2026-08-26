import { useState } from "react";

// ✅ SEGURO: antes de usar la URL del usuario como `href`, se comprueba
// que de verdad empieza por http:// o https://. Si no cumple ese
// patrón (por ejemplo, "javascript:..."), se sustituye por "#" -- un
// enlace que no hace nada, en vez de ejecutar código.
//
// Pruébalo: escribe lo mismo que en la versión insegura:
//   javascript:alert(document.cookie)
// Esta vez el enlace "Su web" apunta a "#": haz click y no pasa nada.
export default function EnlaceSeguro() {
  const [url, setUrl] = useState("");
  const [guardada, setGuardada] = useState(null);

  function guardar() {
    if (!url.trim()) return;
    setGuardada(url);
  }

  // 👈 Solo se acepta la URL si empieza por http:// o https:://
  // cualquier otra cosa (javascript:, data:, vbscript:...) cae a "#".
  const segura = /^https?:\/\//.test(guardada ?? "") ? guardada : "#";

  return (
    <div>
      <h2>✅ Seguro (href validado)</h2>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="javascript:alert(document.cookie)"
        style={{ width: "100%" }}
      />
      <button onClick={guardar}>Guardar enlace</button>
      {guardada && (
        <p>
          <a href={segura}>Su web</a>
        </p>
      )}
    </div>
  );
}
