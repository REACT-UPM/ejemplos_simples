// JavaScript: ¿qué props espera este componente? Hay que leerse el
// componente entero para saberlo -- el editor no ayuda nada aquí.
function Producto({ nombre, precio, enStock }) {
  return (
    <p>
      {nombre} -- {precio} € -- {enStock ? "En stock" : "Agotado"}
    </p>
  );
}

// 🔴 Esto compila y se ejecuta sin ningún aviso. Y está mal a
// propósito: precio es un string ("3.50", no 3.5) y enStock="no" es un
// string NO VACÍO, así que en JavaScript es un valor verdadero -- el
// componente dice que hay stock justo cuando se quería decir que NO
// lo hay.
//
export default function EjemploJS() {
  return <Producto nombre="Café" precio="3.50" enStock="no" />;
}
