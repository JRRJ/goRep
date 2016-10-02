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
        <div id='right-blurb'>Come and join the revolution. Take the stand to have your and your community's voice heard. Go Report #gorep</div>
      </div>
    )
  }
}

export default LandingPage;