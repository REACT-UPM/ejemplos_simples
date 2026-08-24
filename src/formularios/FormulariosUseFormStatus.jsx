import { useFormStatus } from "react-dom";

// Diapositiva 101 — useFormStatus: un botón que se entera solo
//
// useFormStatus se importa de "react-dom", no de "react".
//
// Sirve para escribir un botón "Enviar" reutilizable que sepa por sí mismo
// cuándo su <form> está enviando, sin que nadie tenga que pasarle una prop
// de "pending". Es el escenario típico de un botón compartido en una
// librería de componentes.
//
// LA REGLA IMPORTANTE: useFormStatus solo funciona si el componente que lo
// llama está DENTRO de un <form> (es descendiente suyo en el árbol). El
// hook lee el estado del <form> padre a través de un contexto interno de
// React. Por eso BotonEnviar es un componente aparte: dentro de él sí hay
// un <form> "padre" del que leer el estado.
function BotonEnviar() {
  // pending: true mientras la acción del <form> está en marcha.
  // También devuelve data, method y action con la info del envío en curso.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Enviando..." : "Enviar"}
    </button>
  );
}

async function enviar(formData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Enviado:", formData.get("mensaje"));
}

export default function FormulariosUseFormStatus() {
  return (
    <form action={enviar}>
      <input type="text" name="mensaje" placeholder="Tu mensaje" required />

      {/* Correcto: BotonEnviar es un componente hijo del <form>. */}
      <BotonEnviar />

      {/* INCORRECTO — no lo hagas: si llamases aquí mismo, dentro de
          FormulariosUseFormStatus, a useFormStatus(), `pending` sería
          SIEMPRE false. Este componente es el que RENDERIZA el <form>,
          todavía no está dentro de ningún <form>, así que no hay nada
          que leer.

          const { pending } = useFormStatus(); // <- mal aquí, siempre false
      */}
    </form>
  );
}
