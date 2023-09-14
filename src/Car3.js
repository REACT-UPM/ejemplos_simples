import { useState } from "react";

export default function Car3() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  const changecolor = (color) => {
    setCar({...car, color: color });
  }

  const changeyear = (year) => {
    setCar({...car, year: year });
  }

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button onClick={() => changecolor("blue")}>Change Car Color</button>
      <button onClick={() => changecolor("red")}>Reset Car Color</button>
      <button onClick={() => changeyear("1999")}>Change Car Year</button>
    </>
  )
}