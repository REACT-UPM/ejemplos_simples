import { useState } from "react";
import UserData from "./UserData";
import Panel from "./Panel";

export default function User() {
  const [user, setUser] = useState({name: "John", age: 25, color: "red"});

  function setColor(newcolor) {
    setUser({...user, color: newcolor});
  }

  return (
    <>
      <h1>Mi página de usuario</h1>

      {/* Ejemplo 1: Panel usa props.children */}
      <Panel title="Perfil del usuario">
        <p>Este contenido es pasado como children al Panel.</p>
      </Panel>

      {/* Ejemplo 2: UserData también renderiza sus children */}
      <UserData name={user.name} age={user.age} color={user.color} setColor={setColor}>
        <em>Nota: estos elementos son children de UserData.</em>
        <ul>
          <li>Puedes colorear el panel con los botones de abajo.</li>
          <li>Los children aparecen dentro del componente.</li>
        </ul>
      </UserData>
    </>
  )
}
