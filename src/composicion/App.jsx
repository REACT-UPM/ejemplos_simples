import './../App.css';
import Comment from "./Comment";
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

function App() {
  return (
    <div className="Comments-container">
      <h2 className="Comments-title">Comentarios del Foro</h2>
        <Comment 
          key={comment.id}
          date={comment.date} 
          text={comment.text} 
          author={comment.author} 
        />      
    </div>
  );
}

export default App;