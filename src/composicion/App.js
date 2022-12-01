import Comment from "./CommentWithPropTypes";

//Los meses en new Date empiezan en 0, por eso el 11 es diciembre
const comment = {
  date: new Date(2025, 3, 11),
  text: 'Me encanta aprender React Native!',
  author: {
    name: 'Enrique Barra',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

function App() {
  function adicional(){
    console.log("Adicional");
  }
  return (<Comment
        date={comment.date}
        text={comment.text}
        nuevaprop={7}
        adicional={adicional} />);
}

export default App;