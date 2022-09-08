import { useState } from "react";

export default function Formularios() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit() {
    console.log("Name value: " + name);
    console.log("Email value: " + email);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="Tu nombre" 
        value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" name="email" placeholder="Tu email" 
        value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="submit" value="Submit" />
    </form>
  );
}

