import Card from './Card'

export default function ChildrenDemo() {
  return (
    <div>
      <h1>Demo: props.children</h1>

      {/* Card con texto simple */}
      <Card title="Mensaje simple">
        <p>Este contenido se pasa como children al componente Card.</p>
      </Card>

      {/* Card con elementos variados */}
      <Card title="Contenido mixto" footer="Pie opcional (footer)">
        <ul>
          <li>Puedes pasar cualquier JSX como children.</li>
          <li>Listas, botones, imágenes, etc.</li>
        </ul>
        <button>Acción</button>
      </Card>

      {/* Card anidado: composición + children */}
      <Card title="Card anidado">
        <Card>
          <em>Incluso puedes anidar componentes que usan children.</em>
        </Card>
      </Card>
    </div>
  )
}
