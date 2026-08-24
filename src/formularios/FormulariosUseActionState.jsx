import { useActionState } from "react";

// Diapositiva — useActionState: resultado, error y "enviando"
//
// Esta diapositiva sustituye al viejo ejemplo de "validar mientras se
// escribe" (ver FormulariosComponentesControlados2.jsx): allí, como el
// input era controlado y setName solo se llamaba cuando el nombre YA era
// válido, el campo se quedaba congelado en cuanto fallaba la validación y
// el usuario no podía seguir escribiendo. Validar al enviar, en lugar de
// en cada tecla, evita ese bug de raíz.
//
// useActionState envuelve una función "acción" y te da tres cosas de una
// vez: [estado, formAction, isPending].
const estadoInicial = { error: null, nombreValidado: null };

export default function FormulariosUseActionState() {
  // OJO con el orden de los parámetros: la acción recibe DOS argumentos,
  // (estadoAnterior, formData). Si escribieras `function accion(formData)`
  // a secas (olvidando el primer parámetro), lo que te llegaría en
  // `formData` sería en realidad el estado anterior, no el FormData del
  // envío, y nada de lo que intentes leer con .get(...) tendría sentido.
  async function accion(estadoAnterior, formData) {
    const nombre = formData.get("nombre");

    // Simulamos una validación/petición que tarda, para poder ver el
    // "enviando..." gracias a isPending.
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!nombre || (!nombre.startsWith("p") && !nombre.startsWith("a"))) {
      // Lo que devuelve la acción pasa a ser el nuevo `estado`.
      // OJO: React resetea los campos no controlados en cuanto la acción
      // termina SIN LANZAR una excepción, sin mirar qué has devuelto. Que
      // aquí devolvamos un objeto de error no evita el reseteo: el campo
      // "nombre" se vacía igualmente aunque se muestre el mensaje de
      // error. Para conservar lo que el usuario escribió tras un error
      // hay que ir un paso más allá (por ejemplo, guardar el valor en el
      // propio `estado` y usarlo como defaultValue del input).
      return {
        error: "El nombre tiene que empezar por 'p' o por 'a'",
        nombreValidado: null,
      };
    }

    return { error: null, nombreValidado: nombre };
  }

  const [estado, formAction, isPending] = useActionState(accion, estadoInicial);

  return (
    <>
      {estado.error && <div className="Error">{estado.error}</div>}
      {estado.nombreValidado && (
        <div>Nombre validado: {estado.nombreValidado}</div>
      )}

      {/* Al <form> se le pasa formAction (lo que devuelve useActionState),
          NO la función `accion` directamente. Si le pasases `accion` a
          secas, el formulario seguiría enviándose, pero `estado` nunca se
          actualizaría porque useActionState no se enteraría del envío. */}
      <form action={formAction}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre (empieza por p o a)"
          required
        />
        <input type="submit" value="Submit" disabled={isPending} />
        {isPending && <span> Enviando...</span>}
      </form>
    </>
  );
}
