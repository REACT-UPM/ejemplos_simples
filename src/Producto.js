//componente producto, que recibe como props 
//productName y costInEuros y pinta un producto
export default function Producto(props){
  return <div className="my-product">
    <b>{props.productName}</b>
    <span className="right-aligned">
        ({props.costInEuros} €)
    </span>
    </div>
}
