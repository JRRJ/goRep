import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      navOptions: ['News', 'Videos'],
      authOptions: ['Sign-In']
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
          {
            this.state.authOptions.map((option, idx) => 
              <Link key={idx} to={'/'+option.toLowerCase()}>{option}</Link>
            )
          }
        </div>
      </div>
    )
  }
}

export default NavBar;