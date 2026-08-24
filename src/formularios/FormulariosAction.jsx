// Diapositiva — <form action={fn}> y FormData
//
// Compara esto con FormulariosComponentesControlados1.jsx: allí hay un
// useState por campo, value+onChange en cada input, y un e.preventDefault()
// a mano en el onSubmit.
//
// Desde React 19 se le puede pasar una función al atributo `action` de un
// <form>, en lugar de una URL. React llama a esa función con un objeto
// FormData que contiene todos los campos que tengan atributo `name`. No
// hace falta preventDefault: React ya lo gestiona por nosotros.
//
// Si la función termina sin lanzar error, React resetea el formulario
// automáticamente. OJO: eso solo ocurre porque estos inputs son NO
// controlados (no tienen `value`). Si les pusiéramos value={...}, React no
// podría resetear nada, porque el valor lo estaríamos mandando nosotros.
export default function FormulariosAction() {
  function enviar(formData) {
    // formData.get(...) busca por el atributo `name` del input. Un campo
    // sin `name` no viaja hasta aquí: formData.get("eseCampo") devolvería
    // null. Es el error clásico al empezar con esto: olvidarse del name.
    const nombre = formData.get("nombre");
    const email = formData.get("email");

    console.log("Nombre:", nombre);
    console.log("Email:", email);

    // FormData no es nada de React: es una API estándar del navegador que
    // ya existía antes (la misma que se usa con fetch para subir un
    // formulario). Si quieres ver todos los campos de golpe:
    console.log("Todos los campos:", Object.fromEntries(formData));
  }

  return (
    <form action={enviar}>
      <input type="text" name="nombre" placeholder="Tu nombre" required />
      <input type="email" name="email" placeholder="Tu email" required />
      <input type="submit" value="Submit" />
    </form>
  );
}
