import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      navOptions: ['News', 'Videos'],
      URLS: {signIn: 'http://localhost:4000'}
    };
  }

  render() {
    return (
      <div id='nav'>
        <div id='nav-options'>
          <Link id="app-logo" to='/'>GoRep</Link>
          {
            this.state.navOptions.map((option,idx) => 
              <Link key={idx} to={'/'+option.toLowerCase()}>{option}</Link>
            )
          }
        </div>
        <div id='auth-options'>
          <a href={this.state.URLS.signIn}>Sign In</a>
        </div>
      </div>
    )
  }
}

export default NavBar;