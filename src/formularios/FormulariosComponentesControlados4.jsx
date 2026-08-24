import { useState } from "react";

const MUNICIPIOS_POR_PROVINCIA = {
  Madrid: ["Alcalá de Henares", "Getafe", "Móstoles"],
  Barcelona: ["Badalona", "Sabadell", "Terrassa"],
  Valencia: ["Gandía", "Torrent", "Alzira"],
};

const PROVINCIAS = Object.keys(MUNICIPIOS_POR_PROVINCIA);

// Campos dependientes: el <select> de municipio depende de lo que se haya
// elegido en el <select> de provincia. Es un patrón muy habitual con
// componentes controlados: cuando cambia el campo "padre", hay que
// recalcular las opciones del campo "hijo" y, sobre todo, resetear su
// valor si ya no es válido para la nueva selección.
export default function FormulariosComponentesControlados4() {
  const [provincia, setProvincia] = useState(PROVINCIAS[0]);
  const [municipio, setMunicipio] = useState(
    MUNICIPIOS_POR_PROVINCIA[PROVINCIAS[0]][0]
  );

  // No hace falta guardar los municipios en su propio estado: se derivan
  // de `provincia` en cada render, así que basta con leerlos del objeto.
  const municipios = MUNICIPIOS_POR_PROVINCIA[provincia];

  function handleProvinciaChange(event) {
    const nuevaProvincia = event.target.value;
    setProvincia(nuevaProvincia);
    // El municipio que estuviera elegido pertenece a la provincia
    // anterior. Si no lo reseteamos aquí, el <select> de municipio se
    // quedaría con un `value` que ya no está entre sus <option>, que es
    // el error típico de este patrón: la lista de municipios cambia pero
    // el municipio elegido se queda "colgado" del valor viejo.
    setMunicipio(MUNICIPIOS_POR_PROVINCIA[nuevaProvincia][0]);
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log("Provincia:", provincia);
    console.log("Municipio:", municipio);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Provincia:
        <select value={provincia} onChange={handleProvinciaChange}>
          {PROVINCIAS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Municipio:
        <select
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
        >
          {municipios.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
