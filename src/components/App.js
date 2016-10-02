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
        <div id='content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default App;