// API de "banco" mínima para la demo de SOP y CORS. Sin dependencias:
//
//   node src/cors/servidor.js
//
// Escucha en http://localhost:3001, que es OTRO ORIGEN distinto de la
// app de Vite (http://localhost:5173): mismo esquema y host, pero
// distinto puerto.
//
// Fíjate en la terminal mientras pulsas los botones: TODAS las
// peticiones llegan aquí y se procesan, también las que luego el
// navegador "bloquea". CORS bloquea al navegador, no al servidor.
import http from "node:http";

const PUERTO = 3001;
let saldo = 1000;

const servidor = http.createServer((req, res) => {
  console.log(
    `${req.method} ${req.url}   Origin: ${req.headers.origin ?? "(ninguno)"}`
  );

  // Sin cabeceras CORS: el navegador no deja leer la respuesta a otro origen
  if (req.method === "GET" && req.url === "/api/saldo") {
    return enviarJson(res, { titular: "Ana", saldo });
  }

  // Con CORS: este servidor dice "http://localhost:5173 SÍ puede leerme".
  // Solo ese origen exacto: http://127.0.0.1:5173 sería otro origen.
  if (req.method === "GET" && req.url === "/api/saldo-con-cors") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    return enviarJson(res, { titular: "Ana", saldo });
  }

  // Sin cabeceras CORS, pero con efecto: el dinero sale igualmente.
  // El navegador solo le ocultará la respuesta al JavaScript.
  if (req.method === "POST" && req.url === "/api/transferir") {
    saldo -= 100;
    console.log(`   -> transferencia HECHA. Saldo ahora: ${saldo}`);
    return enviarJson(res, { ok: true, saldo });
  }

  // 🔴 MAL (no lo uses): reflejar el Origin que llegue + credenciales.
  // Cualquier web del mundo podría leer respuestas autenticadas con las
  // cookies de la víctima. Lo dejamos comentado solo para enseñarlo:
  //
  //   res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  //   res.setHeader("Access-Control-Allow-Credentials", "true");

  res.statusCode = 404;
  res.end();
});

function enviarJson(res, datos) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(datos));
}

servidor.listen(PUERTO, () => {
  console.log(`API del banco en http://localhost:${PUERTO}`);
});
