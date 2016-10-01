import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile';
import Not_Found from '../components/Not_Found';
import NewsPage from '../components/NewsPage';
import VideosPage from '../components/VideosPage/VideosPage';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='/profile' component={Profile} />
    <Route path='/news' component={NewsPage} />
    <Route path='/videos' component={VideosPage} />
    <Route path='*' component={Not_Found} />
  </Route>
)