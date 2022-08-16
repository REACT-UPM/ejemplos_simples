export default function BotonCondicional(props){
  const añadido = false;

  return(<div>
    <button>
      {añadido ? 'Añadido' : 'No añadido'}
    </button>
  </div>);
}

