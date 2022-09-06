import Producto from "./Producto";

export default function ListaProductos(props) {
  const  productList  = [
    {
        name: "Coca-cola",
        price: 0.45
    },
    {
        name: "Chocolate",
        price: 1.24
    },
    {
        name: "Popcorn",
        price: 1.98
    }
  ];

  return (<div>
      <h1>Shopping cart</h1>
      { productList.map((product, index) => {
          const { name, price } = product;
          return <Producto key={index}
              productName={name}
              costInEuros={price} />
        }) 
      }
  </div>)
}
