import React from 'react';


// Component Dependencies
import CurrentVid from './Current-Vid';
import VideosList from './Videos-List';
import CommentsBoard from './Comments-Board';

class VideosPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='video-page'>
        <div id='current-video'>
          <CurrentVid />
          <CommentsBoard />
        </div>
        <VideosList />
      </div>
    )
  }
}


export default VideosPage;