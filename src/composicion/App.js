import Comment from "./CommentFull";
//import Comment from "./Comment";

//Los meses en new Date empiezan en 0, por eso el 11 es diciembre
const comment = {
  date: new Date(2025, 3, 11),
  text: 'Me encanta aprender React!',
  author: {
    name: 'Enrique Barra',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

function App() {
  return (<Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />);
}

export default App;