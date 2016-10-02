import React from 'react';


// Component Dependencies

class CurrentVid extends React.Component {
  constructor() {
    super();
    this.state = {
      streamAvailable: true
    }
  }

  toggleAvail() {
    this.setState({
      streamAvailable : !this.state.streamAvailable
    });
    
  }

  render() {
    return (
      <div id='stream'>
        {
          this.state.streamAvailable ? 
            <video id="remoteVideo" autoplay></video> :
            <div id='vid-unavailable'>This stream is unavailable currently</div>
        }
        <pre><button onClick={this.toggleAvail.bind(this)}> Toggle video available status </button></pre>
      </div>
    )
  }
}


export default CurrentVid;