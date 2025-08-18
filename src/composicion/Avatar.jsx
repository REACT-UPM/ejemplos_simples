export default function Avatar(props) {
  return (
    <img className="User-avatar" 
            src={props.author.avatarUrl} 
            alt={`Avatar de ${props.author.name}`}
          />
  );
}