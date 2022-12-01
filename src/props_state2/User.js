import { useState } from "react";
import UserData from "./UserData";

export default function User() {
  const [user, setUser] = useState({name: "John", age: 25, color: "red"});

  function setColor(newcolor) {
    setUser({...user, color: newcolor});
  }

  return (
    <>
      <h1>My página de usuario</h1>
      <UserData name={user.name} age={user.age} color={user.color} setColor={setColor} />
    </>
  )
}
