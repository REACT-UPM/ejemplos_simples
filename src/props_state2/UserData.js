export default function UserData(props) {

  return (
    <div style={{color: props.color}}>
      <h2>Nombre: {props.name}</h2>
      <h2>Edad: {props.age}</h2>
      <h2>Color: {props.color}</h2>
      <button onClick={() => props.setColor("blue")}>Azul</button>
      <button onClick={() => props.setColor("red")}>Rojo</button>
    </div>
  )
}