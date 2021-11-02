import React, {useContext, useRef} from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import {UserContext} from '../auth/UserProvider';
import Navbar from '../navigation/NavBar';
import Search from '../pages/Search';
import Favourites from '../pages/Favourites';
import MapDisplay from './MapDisplay';
import ShowFavourite from './ShowFavourite';
import {Route, Switch, Redirect} from 'react-router-dom';

const Application = () => {
  const user = useContext (UserContext);

  return (
    <React.Fragment>
      <Navbar />
      {user
        ? <div>
            <Switch>
            <Route exact path="/results" render={props => <MapDisplay />} />   
            <Route exact path="/search" render={props => <Search />} />              
              <Route exact path="/favourite" component={ShowFavourite} />
              <Route exact path="/favourites" component={Favourites} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/">
                <Redirect to="/search" /> : <Search />
              </Route>
            </Switch>
          </div>
        : <div>
            <Switch>
              <Route exact path="/" component={Login} />

              <Route exact path="/search">
                <Redirect to="/" /> : <Login />
              </Route>

              <Route exact path="/favourites">
                <Redirect to="/" /> : <Login />
              </Route>

              <Route exact path="/profile">
                <Redirect to="/" /> : <Login />
              </Route>

              <Route exact path="/results">
                <Redirect to="/" /> : <Login />
              </Route>

              <Route exact path="/favourite">
                <Redirect to="/" /> : <Login />
              </Route>

              <Route exact path="/register">
                <Redirect to="/register" /> : <Register />
              </Route>
            </Switch>
          </div>}
    </React.Fragment>
  );
}

export default Application;
