import Comment from "./CommentWithPropTypes";
//import Comment from "./Comment";

//Los meses en new Date empiezan en 0, por eso el 11 es abril
const comment = {
  date: new Date(2025, 3, 11),
  text: 77,
  author: {
    name: "Hola",
    avatarUrl: "https://cdn-food.tribune.com.pk/users/user.png"
  }
};

function App() {
  return (<Comment date={comment.date} text={comment.text} author={comment.author} />);
}

export default App;