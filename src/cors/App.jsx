import { useState } from "react";

// Demo de Same-Origin Policy y CORS. Necesita dos cosas arrancadas:
//
//   node src/cors/servidor.js   -> API en http://localhost:3001
//   npm run dev                 -> esta app en http://localhost:5173
//
// Son orígenes distintos (cambia el puerto). Abre la consola del
// navegador y la terminal del servidor, y pulsa los botones en orden.
const API = "http://localhost:3001";

export default function App() {
  const [resultados, setResultados] = useState({});

  async function probar(id, url, opciones) {
    try {
      const respuesta = await fetch(url, opciones);
      const datos = await respuesta.json();
      setResultados((r) => ({ ...r, [id]: "✅ " + JSON.stringify(datos) }));
    } catch (error) {
      // El navegador no da detalles al JavaScript: solo "Failed to fetch".
      // El motivo real (falta Access-Control-Allow-Origin) está en la consola.
      setResultados((r) => ({ ...r, [id]: "❌ " + error }));
    }
  }

  return (
    <div>
      <h1>Same-Origin Policy y CORS</h1>

      <h2>1. Pedir a otro origen sin CORS</h2>
      <p>
        <code>GET {API}/api/saldo</code>. El servidor responde 200 (míralo en
        su terminal), pero no manda <code>Access-Control-Allow-Origin</code>,
        así que el navegador no le entrega la respuesta a este JavaScript.
      </p>
      <button onClick={() => probar(1, `${API}/api/saldo`)}>Probar</button>
      <p>{resultados[1]}</p>

      <h2>2. Pedir a otro origen con CORS</h2>
      <p>
        <code>GET {API}/api/saldo-con-cors</code>. El servidor responde con{" "}
        <code>Access-Control-Allow-Origin: http://localhost:5173</code>: CORS
        no restringe, permite.
      </p>
      <button onClick={() => probar(2, `${API}/api/saldo-con-cors`)}>
        Probar
      </button>
      <p>{resultados[2]}</p>

      <h2>3. Bloquea el navegador, no tu servidor</h2>
      <p>
        <code>POST {API}/api/transferir</code>, sin CORS. Sale error en
        consola... pero la terminal del servidor dice que la transferencia se
        hizo. Pulsa el 2 otra vez y verás que el saldo ha bajado.
      </p>
      <button
        onClick={() =>
          probar(3, `${API}/api/transferir`, { method: "POST", body: "100" })
        }
      >
        Transferir 100 €
      </button>
      <p>{resultados[3]}</p>

      <h2>4. El proxy de Vite (la buena en desarrollo)</h2>
      <p>
        <code>GET /api/saldo</code>: mismo endpoint que el 1, que no tiene
        CORS. Para el navegador es el mismo origen (localhost:5173), así que
        la Same-Origin Policy ni se activa. Quien llama a localhost:3001 es el
        servidor de Vite (ver <code>vite.config.js</code>), que no es un
        navegador.
      </p>
      <button onClick={() => probar(4, "/api/saldo")}>Probar</button>
      <p>{resultados[4]}</p>

      <h2>5. curl se lo salta</h2>
      <p>
        Desde una terminal: <code>curl -i {API}/api/saldo</code> devuelve 200
        con todos los datos. CORS son instrucciones para navegadores; no
        protegen tu API.
      </p>
    </div>
  );
}
