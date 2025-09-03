import { useState } from "react";

export default function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (username.length < 3) {
      newErrors.username = "El nombre es demasiado corto";
    }
    if (!email.includes("@")) {
      newErrors.email = "El email no es válido";
    }
    setErrors(newErrors);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Formulario de registro</h2>

      <div>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <button
        onClick={validate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>
    </div>
  );
}
