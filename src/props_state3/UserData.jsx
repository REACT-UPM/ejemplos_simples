export default function UserData(props) {

  return (
    <div style={{color: props.color}}>
      <h2>Nombre: {props.name}</h2>
      <h2>Edad: {props.age}</h2>
      <h2>Color: {props.color}</h2>

      {/* Aquí mostramos los children pasados desde el padre */}
      <div style={{ margin: '8px 0' }}>
        {props.children}
      </div>

      <button onClick={() => props.setColor("blue")}>Azul</button>
      <button onClick={() => props.setColor("red")}>Rojo</button>
    </div>
  )
}