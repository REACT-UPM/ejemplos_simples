export default function SaludoCondicional2(props) {
  const usuarioLogueado = true; // obtenido de las cookies o de una base de datos
  const nombre = "Enrique Barra";
  let misaludo;

  if(usuarioLogueado) {
    misaludo = <h2>Hola {nombre}</h2>;
  } else {
    misaludo = <h2>Hola usuario no logueado</h2>;
  }

  return(<div>
    <h1>Página de saludo con o sin loguear</h1>
    {misaludo}
  </div>)
}
