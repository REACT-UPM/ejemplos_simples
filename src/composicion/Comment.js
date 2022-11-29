export default function Comment(props) {

  function formatDate(date) {
    return date.toLocaleDateString();
  }
  
    return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
