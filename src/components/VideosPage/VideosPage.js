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
      <div id='videos-page-container'>
        <CurrentVid />
        <VideosList />
        <CommentsBoard />
      </div>
    )
  }
}


export default VideosPage;