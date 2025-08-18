/*Esto ha sido deprecado en React 19, pero lo dejo para que se vea el uso de PropTypes que puede estar en muchos proyectos anteriores a 2025 */


import PropTypes from 'prop-types';
import UserInfo from './UserInfo';

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

//ver todas las opciones en https://reactjs.org/docs/typechecking-with-proptypes.html
Comment.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired
  }).isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};


Comment.defaultProps = {
  text: "Texto no disponible",
  author: {
    name: "Anónimo", 
    avatarUrl: "https://cdn-food.tribune.com.pk/users/user.png"}
};