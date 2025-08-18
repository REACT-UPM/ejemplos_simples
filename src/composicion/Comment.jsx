import UserInfo from './UserInfo.jsx';

export default function Comment(props) {

  function formatDate(date) {
    return date.toLocaleDateString();
  }

    return (
    <div className="Comment">
      <div className="Comment-header">
        <UserInfo author={props.author} />        
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
