export default function Saludo(props) {
  const elem = <h1>Esto es un titular</h1>;
  const nombre = "Enrique Barra";
  const usuario = { nombre: "Enrique", apellido: "Barra", edad: "40" };

  function formatName(user) {
    return user.nombre + " " + user.apellido + " de " + user.edad;
  }

  return (
    <div>
      {elem}
      <p>Hola {nombre}</p>
      <p>Hola {formatName(usuario)}</p>
    </div>
  );
}