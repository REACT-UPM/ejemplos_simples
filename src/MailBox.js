export default function MailBox(props){
  const unreadMessages = [{ sender: "Enrique Barra", time: "17:50", content: "Hola que tal" },
  { sender: "Pepito Pérez", time: "17:51", content: "¿Vas a venir?" }];
  
  return (<div>
    <h1>Hola</h1>
    {unreadMessages.length>0 &&
      <h2>Tienes {unreadMessages.length} mensajes sin leer.</h2>
    }
  </div>)
}
