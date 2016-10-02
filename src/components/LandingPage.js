import React from 'react';

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = { img: '../assets/landing-page.jpeg'};
  }

  render() {
    return (
      <div id='landing-page'>
        <img src={this.state.img}></img>
        <div id='right-blurb'>
          <div>
            Come and join the revolution. Take the stand to have your and your community's voice heard.
            <br></br><br></br>
            Go Report #gorep
          </div>

          <button id="signup-button"> Join the revolution </button>
        </div>
      </div>
    )
  }
}

export default LandingPage;