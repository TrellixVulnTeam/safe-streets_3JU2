import React, {useContext} from 'react';
import {Router} from '@reach/router';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import {UserContext} from '../auth/UserProvider';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Search from './Search';
import Favourites from './Favourites';

function Application () {
  const user = useContext (UserContext);
  // TODO change profile to search form Page
  // If user is logged in, display profile page, else show sign up page
  // TODO NOTE:  <ComponentName path="browserAddress" />
 
 
  return (
    <React.Fragment>
      <Navbar />
      {user ? (<React.Fragment>           
            <Search />     
          </React.Fragment>
          ) : ( 
            <Router>  
            <Login exact path="/" />   
            <Register path="/register" /> 
            <Profile path="/profile" />                     
          </Router>
          )}
    </React.Fragment>
  );
}
// TODO maybe try moving the router for favs and profile out of the above boolean check
// TODO find correct method of linking to page from navbar and where the router goes

// <Router>
     
//      <Favourites path="/favourites" />       
     
//    </Router>
export default Application;
