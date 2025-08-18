import { useState } from "react";

export default function Car2() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red",
    property: "Enrique"
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button onClick={() => setCar({ year: "2021" })}>CAMBIAR AÑO</button>
    </>
  )
}