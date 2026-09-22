import './../App.css';
import './Comment.css';

//Los meses en new Date empiezan en 0, por eso el 11 es abril
const comment = {
    id: 1,
    date: new Date(2025, 3, 11),
    text: "Os recomiendo el libro 'Aprende React 19 desde cero', es muy bueno y fácil de entender.",
    author: {
      name: "Enrique",
      avatarUrl: "https://cdn-food.tribune.com.pk/users/user.png"
    }
  };

function formatDate(date) {
  return date.toLocaleDateString();
}

//AQUI NO HAY COMPOSICION DE COMPONENTES: todo el HTML del comentario
//(avatar, nombre del autor, texto y fecha) está escrito dentro de App.
//En la carpeta "composicion" lo mismo se resuelve con los componentes
//Comment -> UserInfo -> Avatar, cada uno con una responsabilidad.
function App() {
  return (
    <div className="Comments-container">
      <h2 className="Comments-title">Comentarios del Foro</h2>
      <div className="Comment">
        <div className="Comment-header">
          <div className="User-info">
            <img
              className="User-avatar"
              src={comment.author.avatarUrl}
              alt={`Avatar de ${comment.author.name}`}
            />
            <div className="User-author">
              {comment.author.name}
            </div>
          </div>
        </div>
        <div className="Comment-content">
          <div
            className="Comment-text"
            title={comment.text.length > 200 ? comment.text : undefined}
          >
            {comment.text.length > 200 ? comment.text.substring(0, 200) + '...' : comment.text}
          </div>
          <div className="Comment-date">
            {formatDate(comment.date)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
