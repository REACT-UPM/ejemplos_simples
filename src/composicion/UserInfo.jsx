import Avatar from './Avatar.jsx';

export default function UserInfo(props) {
  return (
    <div className="User-info">
      <Avatar author={props.author} />
      <div className="User-author">
        {props.author.name}
      </div>
    </div>
  );
}