import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='navbar'>
        <span id='app-logo'><Link to='/'>GoRep</Link></span> 
        <span className='nav-options'><Link to='/news'>News</Link></span>
        <span className='nav-options'><Link to='/videos'>Videos</Link></span>
        <span className='auth-options'>Sign In</span>
      </div>
    )
  }
}

export default NavBar;