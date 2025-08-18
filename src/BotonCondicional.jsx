import { useState } from "react";

export default function BotonCondicional(props){
  //let añadido = false;
  const [añadido, setAñadido] = useState(false);

  function change(){
    setAñadido(!añadido);
    console.log("la variable vale: ", añadido);
  }

  return(<div>
    <button onClick={()=>change()}>
      {añadido ? 'Añadido' : 'No añadido'}
    </button>
  </div>);
}

