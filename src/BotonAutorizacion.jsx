import { useState } from "react";

// 🔴 LA IDEA MAL ENTENDIDA: `{usuario.esAdmin && <BotonBorrarTodo />}`
// no es seguridad, es interfaz. Oculta el botón, pero no protege nada:
//   1. El endpoint que borra sigue existiendo, se muestre el botón o
//      no -- cualquiera puede llamarlo directamente (con curl, fetch
//      desde la consola, etc.), sin pasar por esta pantalla.
//   2. `usuario.esAdmin` es un dato que ha llegado al navegador en un
//      JSON -- y todo lo que llega al navegador, el propio usuario
//      puede leerlo y CAMBIARLO en memoria (DevTools, un proxy...).
// La única autorización real es la que hace el SERVIDOR al recibir la
// petición, comprobando SUS propios datos -- nunca lo que el cliente
// dice de sí mismo.

// "Servidor" simulado: su verdad sobre quién es admin vive aquí, no
// depende de nada que le mande el cliente.
const servidor = { esAdminDeVerdad: false };

function borrarTodoEnServidor() {
  if (!servidor.esAdminDeVerdad) {
    return "403 Forbidden -- el servidor no te cree admin";
  }
  return "200 OK -- borrado";
}

export default function BotonAutorizacion() {
  // 👈 Esto es "el JSON que llegó al cliente": un dato que el propio
  // cliente puede manipular en memoria. Aquí se simula con un botón en
  // vez de con las DevTools, pero el efecto es idéntico.
  const [usuario, setUsuario] = useState({ esAdmin: false });
  const [respuesta, setRespuesta] = useState(null);

  function manipularEnElCliente() {
    setUsuario({ esAdmin: true }); // 🔴 esto es justo lo que haría alguien desde la consola
  }

  function llamar(origen) {
    setRespuesta(`${origen} → ${borrarTodoEnServidor()}`);
  }

  return (
    <div>
      <p>
        usuario.esAdmin (en el cliente): <b>{String(usuario.esAdmin)}</b>
      </p>
      <button onClick={manipularEnElCliente}>
        🔧 Manipular usuario.esAdmin en el cliente (simula DevTools)
      </button>

      {/* 🔴 Esta línea es exactamente el ejemplo del enunciado: ocultar
          el botón según un dato que controla el propio cliente. */}
      {usuario.esAdmin && (
        <p>
          <button onClick={() => llamar("Botón (visible por esAdmin)")}>
            Borrar todo
          </button>
        </p>
      )}

      <p>
        <button onClick={() => llamar("curl directo al endpoint")}>
          🌐 Llamar al endpoint sin pasar por el botón (simula curl)
        </button>
      </p>

      {respuesta && <p>Respuesta del servidor: {respuesta}</p>}
    </div>
  );
}

// En el servidor (ej. Express.js)
app.post('/api/v1/borrar-usuarios', (req, res) => {
  
  // ✅ LA VERDADERA SEGURIDAD ESTÁ AQUÍ
  // Verificamos quién es realmente a través de una cookie o JWT seguro, 
  // no nos fiamos del JSON que manda el cliente.
  const usuarioReal = verificarToken(req.headers.authorization);

  if (!usuarioReal.esAdmin) {
    return res.status(403).json({ error: "Prohibido: No tienes permisos" });
  }

  // Si llegamos aquí, podemos ejecutar la acción destructiva
  baseDeDatos.borrarTodo();
});

