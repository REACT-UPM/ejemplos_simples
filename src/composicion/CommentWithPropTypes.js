import PropTypes from 'prop-types';
import UserInfo from './UserInfo';

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

//ver todas las opciones en https://reactjs.org/docs/typechecking-with-proptypes.html
//para author podría usar también: PropTypes.shape({name: PropTypes.string, avatarUrl: PropTypes.string})
Comment.propTypes = {
  author: PropTypes.object,
  text: PropTypes.string,
  date: PropTypes.instanceOf(Date)
};


Comment.defaultProps = {
  text: "Texto no disponible",
  author: {
    name: "Anónimo", 
    avatarUrl: "https://cdn-food.tribune.com.pk/users/user.png"}
};