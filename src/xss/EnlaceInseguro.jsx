import { useEffect, useRef, useState } from "react";

// 🔴 INSEGURO: poner en `href` lo que escribió el usuario, sin validar.
// Si el valor empieza por "javascript:", el navegador lo interpreta
// como código y lo ejecuta al hacer click en el enlace. No hace falta
// ningún <script> ni dangerouslySetInnerHTML: basta con un href.
//
// Ojo: desde React 19, `<a href={url}>` bloquea las URLs "javascript:"
// (salta "React has blocked a javascript: URL as a security
// precaution"). Pero esa protección solo existe si el atributo lo pone
// React. En cuanto alguien toca el DOM directamente (una ref +
// setAttribute, como aquí, o window.location = url, window.open(url),
// una librería que no es de React...), la protección desaparece.
// Y en React 18 o anteriores ni siquiera hace falta esto: basta con
// href={url}.
//
// Pruébalo: escribe esto en el cuadro y pulsa "Guardar enlace":
//   javascript:alert(document.cookie)
// Haz click en el enlace "Su web" que aparece debajo -- el alert()
// salta.
export default function EnlaceInseguro() {
  const [url, setUrl] = useState("");
  const [guardada, setGuardada] = useState(null);
  const enlace = useRef(null);

  function guardar() {
    if (!url.trim()) return;
    setGuardada(url);
  }

  // 👈 Escribimos el href "a mano" en el DOM: React no lo ve y no lo filtra
  useEffect(() => {
    if (enlace.current) enlace.current.setAttribute("href", guardada);
  }, [guardada]);

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
          {/* 👈 el href lo pone el useEffect: lo que sea que haya escrito el usuario, tal cual */}
          <a ref={enlace}>Su web</a>
        </p>
      )}
    </div>
  );
}
