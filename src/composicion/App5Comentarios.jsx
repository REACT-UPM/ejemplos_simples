import './../App.css';
import Comment from "./Comment";
import UserInfo from "./UserInfo";
import './Comment.css';

//Los meses en new Date empiezan en 0, por eso el 11 es abril
const currentUser = {
  name: "Ana García",
  avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147135.png"
};

const comments = [
  {
    id: 1,
    date: new Date(2025, 3, 11),
    text: "Os recomiendo el libro 'Aprende React 19 desde cero', es muy bueno y fácil de entender.",
    author: {
      name: "Enrique",
      avatarUrl: "https://cdn-food.tribune.com.pk/users/user.png"
    }
  },
  {
    id: 2,
    date: new Date(2025, 3, 12),
    text: "¡Totalmente de acuerdo! También me gustó mucho el capítulo sobre hooks personalizados. En él explican cómo crear tus propios hooks para reutilizar lógica en componentes de React. Es una herramienta muy poderosa. Además, el libro está muy bien estructurado y es fácil de seguir. Lo recomiendo a todos los que quieran aprender React.",
    author: {
      name: "María",
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147144.png"
    }
  },
  {
    id: 3,
    date: new Date(2025, 3, 13),
    text: "¿Alguien sabe si hay una segunda parte del libro? Me ha encantado este.",
    author: {
      name: "Carlos",
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147133.png"
    }
  },
  {
    id: 4,
    date: new Date(2025, 3, 14),
    text: "El libro es excelente, pero creo que le falta un capítulo sobre el manejo de formularios en React. Sería genial si pudieran añadirlo en una futura edición.",
    author: {
      name: "Laura",
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147136.png"
    }
  },
  {
    id: 5,
    date: new Date(2025, 3, 15),
    text: "Estoy de acuerdo con Laura, el manejo de formularios es un tema importante en React y sería útil tener más información al respecto.",
    author: {
      name: "Pedro",
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147142.png"
    }
  }
];

function App() {
  return (
    <div className="Comments-container">
      <header className="App-header">
        <h1 className="App-title">Foro de Discusión</h1>
        <div className="App-user-info">
          <span>Conectado como: </span>
          <UserInfo author={currentUser} />
        </div>
      </header>
      
      <h2 className="Comments-title">Comentarios del Foro</h2>
      {comments.map(comment => (
        <Comment 
          key={comment.id}
          date={comment.date} 
          text={comment.text} 
          author={comment.author} 
        />
      ))}
    </div>
  );
}

export default App;