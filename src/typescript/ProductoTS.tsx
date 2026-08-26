// TypeScript: el tipo de las props documenta el contrato Y lo hace
// cumplir. Ya no hace falta leerse el componente entero para saber
// qué espera -- lo dice el propio tipo, y el editor avisa si algo no
// encaja.
type ProductoProps = {
  nombre: string;
  precio: number;
  enStock: boolean;
};

function Producto({ nombre, precio, enStock }: ProductoProps) {
  return (
    <p>
      {nombre} -- {precio} € -- {enStock ? "En stock" : "Agotado"}
    </p>
  );
}

// ❌ Mismo error a propósito que en la versión JavaScript
// (ProductoJS.jsx): precio como string y enStock="no". Aquí el editor
// lo marca en ROJO antes de guardar el fichero -- ni hace falta
// ejecutar nada para darse cuenta del problema.
//
// (Vite no comprueba tipos al arrancar el servidor de desarrollo, así
// que si ignoras el aviso esto se "ejecuta" igual que la versión JS:
// la diferencia está en el aviso del editor, no en si el navegador lo
// deja pasar.)
export default function EjemploTS() {
  return <Producto nombre="Café" precio="3.50" enStock="no" />;
}
