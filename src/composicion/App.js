import Comment from "./CommentWithPropTypes";

//Los meses en new Date empiezan en 0, por eso el 11 es diciembre
const comment = {
  date: new Date(2025, 3, 11),
  text: 'Me encanta aprender React!'
};

function App() {
  return (<Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />);
}

export default App;