import React from 'react';

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = { img: '../assets/landing-page.jpeg'};
  }

  render() {
    return (
      <div id='landing-page-container'>
        <div id='landing-page-img-container'>
          <img src={this.state.img}></img>
          <div className='info-blurb-left'></div>
        </div>
      </div>
    )
  }
}

export default LandingPage;