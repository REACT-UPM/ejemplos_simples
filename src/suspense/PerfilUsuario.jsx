// Este es el componente que se carga "de forma perezosa" (lazy) desde
// App.jsx. No tiene nada especial en sí mismo: cualquier componente normal
// se puede cargar con lazy(), la magia está en cómo se importa, no aquí.
export default function PerfilUsuario() {
  return (
    <div>
      <h3>Enrique</h3>
      <p>Profesor de Ingeniería Web</p>
    </div>
  );
}
