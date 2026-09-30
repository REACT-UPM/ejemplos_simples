export default function SaludoCondicional(props) {
  const usuarioLogueado = false; // obtenido de las cookies o de una base de datos
  const nombre = "Enrique Barra";

  if(usuarioLogueado) {
    return <h1>Hola {nombre}</h1>;
  } else {
    return <h1>Hola usuario no logueado</h1>;
  }
}
