import { useState } from "react";
import Producto from "./Producto";

export default function ListaProductos(props) {
  const  productList  = [
    {name: "Coca-cola", price: 0.45},
    {name: "Chocolate", price: 1.24}, 
    {name: "Popcorn", price: 1.98},
    {name: "Water", price: 0.33},
    {name: "Candy", price: 0.89}
  ];

  return (<div>
      <h1>Shopping cart</h1>
      { productList.map((product, index) => {
          let { name, price } = product;
          if (price > 1) {
              name = name.toUpperCase();
          }
          return <Producto key={index} productName={name} costInEuros={price} />
        }) 
      }
  </div>)
}
