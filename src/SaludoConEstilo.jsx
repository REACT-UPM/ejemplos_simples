export default function SaludoConEstilo(props) {
  const elem = <h1>Esto es un titular</h1>;
  const nombre = "Enrique Barra";
  const usuario = { nombre: "Enrique", apellido: "Barra", edad: "40" };

  function formatName(user) {
    return user.nombre + " " + user.apellido + " de " + user.edad + " años";
  }

  const divStyle = {
    backgroundColor: "blue",
    color: "white",
    fontFamily: "Arial",
    padding: "10px",
  };

  return (
    <div style={divStyle}>
      {elem}
      <p>Hola {nombre}</p>
      <p>Hola {formatName(usuario)}</p>
    </div>
  );
}
