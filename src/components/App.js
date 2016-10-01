import React from 'react';

// Component dependencies
import NavBar from './NavBar';

// Class declaration
class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='main-app'>
        <NavBar />
        <div id='routedComponentsContainer'>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default App;