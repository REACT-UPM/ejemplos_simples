export default function Comment(props) {

  function formatDate(date) {
    return date.toLocaleDateString();
  }
  

  //en este ejemplo no hay UserInfo y está todo en el componente Comment
  //en el otro ejemplo (fichero Comment.js) se ha sacado una parte a otro componente UserInfo 
  //quedando asi más refactorizado el código, mantenible, escalable y reutilizable
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
             src={props.author.avatarUrl}
             alt={props.author.name} 
             width="100px"/>
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
