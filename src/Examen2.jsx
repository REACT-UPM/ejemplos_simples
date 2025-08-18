import React, { useEffect, useState } from 'react';

export default function Examen2() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        const obtenerDatos = async () => {
            console.log('Obteniendo datos...');
          setTimeout(async () => {
            console.log('Obteniendo datos2...');
            const respuesta = await fetch('https://dummyjson.com/users');
            const data = await respuesta.json();
            setDatos(data);
            setLoading(false);
          }, 5000);
        };
    
        obtenerDatos();
      }, [number]);

  return (<div>
    {loading ? <p>Cargando...</p>:<p>Datos obtenidos</p>}
    <button onClick={() => setNumber(number + 1)}>Incrementar</button>
    </div>);
}

// Pregunta: ¿Qué ocurrirá si se desmonta el componente antes de 5 segundos?
// a) Se producirá un error en la consola al desmontar el componente ya que tiene un temporizador en ejecución.
// b) El setTimeout y la llamada a fetch se cancelan automáticamente cuando el componente se desmonta.
// c) El useEffect se ejecutará nuevamente cuando el componente se vuelva a montar, reiniciando el temporizador y la llamada a fetch.
// d) La llamada a fetch se seguirá ejecutando después de que se haya desmontado, lo que podría causar un error.

// Pregunta: ¿Si añadimos [number] como segundo argumento al useEffect, qué ocurrirá?
// a) El useEffect fallará cuando el usuario haga click en el botón "Incrementar" ya que tiene un setTimeout programado.
// b) El useEffect se ejecutará cada vez que cambie algo en el estado.
// c) El useEffect se ejecutará solo una vez cuando se monte el componente.
// d) El useEffect se ejecutará cuando se monte el componente y cada vez que el usuario haga click en el botón "Incrementar".
