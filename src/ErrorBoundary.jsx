import React from 'react';

//para probar este componente hay que renderizarlo por fuera del árbol que se quiera
//ejemplo <ErrorBoundary><SaludoSimple/></ErrorBoundary> 
//y en SaludoSimple en ese caso lanzar (throw) alguna excepción o hacer algo que la cause
// ejemplo throw new Error('KABOOM');  
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }  

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
    console.log("ERROR: ", error, errorInfo);
    this.setState({ hasError: true});
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}