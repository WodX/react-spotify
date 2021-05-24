import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Redirect from '../components/Redirect';
import Dashboard from '../components/Dashboard';
import NotFound from '../components/NotFound';
import Album from '../components/Album';
import Artist from '../components/Artist';
import Playlist from '../components/Playlist';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App-header">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/redirect" component={Redirect} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/album" component={Album} />
            <Route path="/artist" component={Artist} />
            <Route path="/playlist" component={Playlist} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRouter;