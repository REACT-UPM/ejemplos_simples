export default function Comment(props) {

  function formatDate(date) {
    return date.toLocaleDateString();
  }

  //en este ejemplo no hay UserInfo y está todo en el componente Comment
  //en el otro ejemplo (fichero Comment.js) se ha sacado una parte a otro componente UserInfo 
  //quedando asi más refactorizado el código, mantenible, escalable y reutilizable
    return (
    <div className="Comment">
      <div className="Comment-header">
        <div className="User-info">
          <img 
            className="User-avatar" 
            src={props.author.avatarUrl} 
            alt={`Avatar de ${props.author.name}`}
          />
          <div className="User-author">
            {props.author.name}
          </div>
        </div>
      </div>
      <div className="Comment-content">
        <div 
          className="Comment-text"
          title={props.text.length > 200 ? props.text : undefined}
        >
          {props.text.length > 200 ? props.text.substring(0, 200) + '...' : props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    </div>
  );
}
